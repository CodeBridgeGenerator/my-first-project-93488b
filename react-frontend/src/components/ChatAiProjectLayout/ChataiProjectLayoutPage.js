import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _, { create } from 'lodash';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import ChataiProjectActionPage from './ChataiProjectActionPage';
import ChataiProjectResponsePage from './ChataiProjectResponsePage';
import ChataiProjectPromptPage from './ChataiProjectPromptPage';
import requestObjectJson from './requestObject.json';
// import responseObject from "./responseObject.json";
import { ProgressSpinner } from 'primereact/progressspinner';
//What are the obligations of the Borrower regarding taxes, fees, and other governmental charges under the terms and conditions of the Agreement? Which are the relevant clauses?

const ChataiProjectLayoutPage = (props) => {
    const [data, setData] = useState();
    const [selectedConfigId, setSelectedConfigId] = useState();
    const [selectedModel, setSelectedModel] = useState();
    const [openChatAiConfig, setOpenChatAiConfig] = useState(false);
    const [openFAChatAiConfig, setOpenFAChatAiConfig] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [descriptionOnAction, setDescriptionOnAction] = useState();
    const [prompt, setPrompt] = useState('');
    const [responsePrompt, setResponsePrompt] = useState('');
    const [responseRemarks, setResponseRemarks] = useState('');
    const [error, setError] = useState(null);
    const [currentPromptId, setCurrentPromptId] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [numConfig, setNumConfig] = useState(0);
    const [refUserConfig, setRefUserConfig] = useState([]);
    const [temperature, setTemperature] = useState(0.5);
    const [topP, setTopP] = useState(0.5);
    const [topK, setTopK] = useState(250);
    const [maxLength, setMaxLength] = useState(2048);
    const [showBottomScroller, setBottomScroller] = useState(false);
    const urlParams = useParams();
    const sample =
        'Relevant extracts: [1] "The Borrower must pay interest on all principal sums of moneys lent or advanced by the Bank to the Borrower or otherwise owing or payable by the Borrower to the Bank under each Facility. Such interest will, except where otherwise provided in this Agreement or decided by the Bank pursuant to this Agreement, be calculated (as well after as before any court order or judgment and even if the banker-customer relationship between the Bank and the Borrower has ceased or been terminated): (a) at the prescribed interest rate for that Facility stated in the relevant Letter of Offer, or if not stated in the relevant Letter of Offer, at such interest rate for that Facility as may be prescribed by the Bank in its discretion from time to time; (b) with daily or monthly or other rest periods stated in the Letter of Offer, or if not stated in the relevant Letter of Offer, with such rest periods as the Bank may from time to time decide in its discretion; and (c) in accordance with the Bank\'s usual practice from time to time or otherwise in such manner as the Bank may from time to time decide, having regard to, amongst other things, the nature of that Facility." [2] "Regardless of the prescribed interest rate for each Facility stated or mentioned in the relevant Letter of Offer or decided by the Bank from time to time pursuant to this Agreement and regardless of whatever else stated or implied in this Agreement or any Letter of Offer, the Bank is entitled at any time and from time to time, to vary the prescribed interest rate for any Facility as the Bank thinks fit in its discretion, whether: (a) by varying the Base Rate or Base Lending Rate or any other reference rate (if any) used in determining the prescribed interest rate for that Facility, as the case may be; (b) by varying the interest margin/spread comprised in the prescribed interest rate for that Facility; (c) by changing the reference rate used in determining the prescribed interest rate for that Facility (for example, if the reference rate for determining the prescribed interest rate for that Facility is the Base Lending Rate, by changing such reference rate from the Base Lending Rate to the Base Rate or the Effective Cost of Funds (defined below) as the Bank deems fit in its discretion, or vice versa); (d) by a combination of any two or more of the above." Answers with citation: The interest rate on the Facilities is determined based on the prescribed interest rate stated in the Letter of Offer, or if not stated in the Letter of Offer, the interest rate prescribed by the Bank at its discretion. [1] The Bank has the absolute right to vary the prescribed interest rate at any time for any Facility by changing the Base Rate, Base Lending Rate, interest margin, or reference rate used to determine the rate. [2] The Bank can make these variations in its sole discretion. [2]';
    const pageEndRef = useRef(null);

    const scrollToBottom = () => {
        pageEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        });
    };

    useEffect(() => {
        const scrollHeight = pageEndRef.current.scrollHeight || 0;
        const height = pageEndRef.current.clientHeight || 0;
        setBottomScroller(scrollHeight > height);
    }, []);

    function stringToHTML(inputText) {
        const ind = inputText?.indexOf('Answers with citation:');
        let textSwapped;
        textSwapped = ind !== -1 ? inputText.substr(ind) + '<br/><br/>' + inputText.substr(0, ind) : inputText;
        const responseText = textSwapped
            .replaceAll('\n\n', '<br/><br/>')
            .replaceAll('\n', '<br/>')
            // .replaceAll("] ", "]<br/><br/>")
            // .replaceAll(": and (", ":<br/><br/> and (")
            // .replaceAll(": (", ":<br/><br/>(")
            // .replaceAll("; and (", ";<br/><br/> and (")/
            // .replaceAll("; (", ";<br/><br/>(")
            .replaceAll(']"', ']"')
            .replaceAll('Relevant quotes', '<b>Relevant quotes</b>')
            .replaceAll('Answers with citation:', '<br/> <b>Answers with citation:</b>');
        return responseText;
    }

    function stringToCRLF(inputText) {
        inputText = inputText.replaceAll('<br/>', '\n').replaceAll('<b>', '').replaceAll('</b>:', ':\n');
        return inputText;
    }

    useEffect(() => {
        //on mount

        if (urlParams?.promptId && urlParams?.promptId !== '') {
            setLoading(true);
            client
                .service('prompts')
                .find({ query: { $limit: 10000, _id: urlParams.promptId } })
                .then((res) => {
                    let results = res.data;
                    // setSelectedModel(results[0]);
                    // displayLikeChatGPT(results[0]?.responseText);
                    setData(results[0]);
                    if (results[0]?.params) {
                        const params = JSON.parse(results[0]?.params);
                        setTemperature(params?.temperature);
                        setTopP(params?.top_p);
                        setTopK(params?.top_k);
                        setMaxLength(params?.max_tokens_to_sample);
                    }
                    setResponse(stringToHTML(results[0]?.responseText));
                    setResponsePrompt(results[0]?.prompt);
                    setResponseRemarks(results[0]?.userRemarks);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log({ error });
                    props.alert({
                        title: 'Chatai',
                        type: 'error',
                        message: error.message || 'Failed get chatai'
                    });
                    setLoading(false);
                });
        }
        getUserConfig();
    }, [urlParams?.promptId]);

    const getUserConfig = () => {
        client
            .service('config')
            .find({ query: { $limit: 10000 } })
            .then((res) => {
                const results = res.data;
                setRefUserConfig(results);
            });
    };

    const getParams = (type = 'string') => {
        const paramObj = {
            temperature,
            top_k: topK,
            top_p: topP,
            max_tokens_to_sample: maxLength,
            stop_sequences: ['Human:']
        };
        if (type !== 'string') {
            return paramObj;
        }
        return JSON.stringify(paramObj);
    };

    const createPropmtSuccessRecord = (responseObject) => {
        let _data = {
            sessionId: '1',
            chatAiId: '660a84ff899a21d9afef0b29',
            configid: '660a8b94899a21d9afef0c77',
            prompt: prompt,
            refDocs: documents,
            responseText: responseObject['response_text'],
            systemId: responseObject['id'],
            type: responseObject['type'],
            role: responseObject['role'],
            model: responseObject['model'],
            stopReason: responseObject['stop_reason'],
            stopSequence: responseObject['stop_sequence'],
            inputTokens: responseObject['input_tokens'],
            outputTokens: responseObject['output_tokens'],
            cost: responseObject['output_tokens'] * 0.005 + responseObject['input_tokens'] * 0.001,
            status: true,
            error: null,
            params: getParams(),
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        client
            .service('prompts')
            .create(_data)
            .then((res) => {
                // console.log({ res });
                setCurrentPromptId(res['_id']);
                props.alert({
                    title: 'Legal GenAi',
                    type: 'success',
                    message: 'Saved Prompt'
                });
            })
            .catch((error) => {
                props.alert({
                    title: 'Prompt',
                    type: 'error',
                    message: error.message || 'Failed to save Prompt'
                });
            });
    };

    const createPropmtFailureRecord = (error, responseObject) => {
        let _data = {
            sessionId: '1',
            chatAiId: '660a84ff899a21d9afef0b29',
            configid: '660a8b94899a21d9afef0c77',
            prompt: prompt,
            ref_docs: documents,
            responseText: responseObject?.messages[0]?.content[0]?.text,
            systemId: 'none',
            type: responseObject?.messages[0]?.content[0]?.type,
            role: responseObject?.messages[0]?.role,
            model: responseObject['anthropic_version'],
            stopReason: '',
            stopSequence: '',
            inputTokens: 1000000,
            outputTokens: 0,
            cost: 1000000 * 0.005 + 0 * 0.001,
            status: false,
            error: error.message,
            params: getParams(),
            createdBy: props.user?._id,
            updatedBy: props.user?._id
        };

        client
            .service('prompts')
            .create(_data)
            .catch((error) => {
                props.alert({
                    title: 'Prompt',
                    type: 'error',
                    message: error.message || 'Failed to save Prompt'
                });
            });
    };

    const patchResponse = (_data, success, failure) => {
        if (!_data?.currentPromptId) {
            props.alert({
                title: 'Prompt',
                type: 'error',
                message: 'Prompt Id not found.'
            });
            return;
        }
        setCurrentPromptId(_data?.currentPromptId);
        client
            .service('prompts')
            .patch(_data?.currentPromptId, _data?.data)
            .then((res) => {
                // console.log({ res });
                props.alert({
                    title: 'Legal GenAi',
                    type: 'success',
                    message: success
                });
            })
            .catch((error) => {
                props.alert({
                    title: 'Prompt',
                    type: 'error',
                    message: error.message || failure
                });
            });
    };

    const responseFailure = (error) => {
        // Add error class to the paragraph element and set error text
        const responseObject = {
            anthropic_version: 'bedrock-2023-05-31',
            max_tokens: getParams().max_tokens_to_sample,
            messages: [{ role: 'user', content: [{ type: 'text', text: prompt }] }]
        };
        setError(error?.message);
        createPropmtFailureRecord(error?.message, responseObject);
        props.alert({
            type: 'error',
            title: 'Sending request to Chat Ai error',
            message: error?.message
        });
        setResponse('Oops! Something went wrong while retrieving the response. Please try again.');
    };

    const getClaude3OpusResponse = async () => {
        const API_URL = process.env.REACT_APP_SERVER_URL + '/claude3Opus';
        // Define the properties and data for the API request
        // let requestObject = refUserConfig[numConfig];
        let requestObject = requestObjectJson;
        requestObject.params = getParams('object');
        // console.log(numConfig, refUserConfig, requestObject);
        // return;

        let thePrompt = prompt;
        if (thePrompt === '') return;
        // if (!prompt.match(/\?$/)) thePrompt = +"?";
        requestObject['question'] = thePrompt;

        const requestOptions = {
            method: 'post',
            url: API_URL,
            data: requestObject,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setLoading(true);
        setResponse('');
        setResponsePrompt(prompt);

        // convert the body to string of JSON format
        // console.log(JSON.stringify(JSON.stringify(requestObject)));

        try {
            const responseText = await axios(requestOptions);
            setLoading(false);
            console.log(responseText);
            const responseObject = responseText.data;
            console.log(responseObject['response_text']);
            setResponse(stringToHTML(responseObject['response_text']));
            createPropmtSuccessRecord(responseObject);
        } catch (error) {
            responseFailure(error);
        } finally {
            setLoading(false);
        }
    };

    const displayLikeChatGPT = (responseText, setDisplay = setResponse) => {
        if (!responseText) return;
        let i = 0;
        const stringResponse = stringToHTML(responseText);
        const intervalId = setInterval(() => {
            setDisplay(stringResponse.slice(0, i));
            i++;
            if (i > stringResponse.length) {
                clearInterval(intervalId);
            }
        }, 20);

        return () => clearInterval(intervalId);
    };

    return (
        <>
            {loading ? (
                <Dialog header="GenAi in Progress" visible={loading} onHide={() => setLoading(false)}>
                    {' '}
                    <div className="flex justify-content-center align-items-vertical">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                    </div>
                    <Skeleton className="mb-2" borderRadius="16px"></Skeleton>
                    <Skeleton width="10rem" className="mb-2" borderRadius="16px"></Skeleton>
                    <Skeleton width="5rem" borderRadius="16px" className="mb-2"></Skeleton>
                    <Skeleton height="2rem" className="mb-2" borderRadius="16px"></Skeleton>
                    <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
                </Dialog>
            ) : (
                <div ref={pageEndRef}>
                    <div className="card p-0 overflow-hidden">
                        <ChataiProjectActionPage
                            key="action"
                            selectedModel={selectedModel}
                            selectedConfigId={selectedConfigId}
                            setSelectedConfigId={setSelectedConfigId}
                            setSelectedModel={setSelectedModel}
                            openChatAiConfig={openChatAiConfig}
                            setOpenChatAiConfig={setOpenChatAiConfig}
                            openFAChatAiConfig={openFAChatAiConfig}
                            setOpenFAChatAiConfig={setOpenFAChatAiConfig}
                            setPrompt={(prompt) => {
                                setPrompt(prompt);
                                setResponse('');
                            }}
                            displayLikeChatGPT={displayLikeChatGPT}
                            descriptionOnAction={descriptionOnAction}
                            setDescriptionOnAction={setDescriptionOnAction}
                            documents={documents}
                            setDocuments={setDocuments}
                            numConfig={numConfig}
                            setNumConfig={setNumConfig}
                            refUserConfig={refUserConfig}
                            setRefUserConfig={setRefUserConfig}
                            temperature={temperature}
                            setTemperature={setTemperature}
                            topP={topP}
                            setTopP={setTopP}
                            topK={topK}
                            setTopK={setTopK}
                            maxLength={maxLength}
                            setMaxLength={setMaxLength}
                        />
                    </div>
                    <div
                        className="card"
                        style={{
                            minHeight: 'calc(45vh - 100px)',
                            height: 'fit-content',
                            position: 'relative'
                        }}
                    >
                        <ChataiProjectResponsePage
                            key="response"
                            response={response}
                            responsePrompt={responsePrompt}
                            responseRemarks={responseRemarks}
                            currentPromptId={currentPromptId}
                            error={error}
                            patchResponse={patchResponse}
                            stringToHTML={stringToHTML}
                            stringToCRLF={stringToCRLF}
                            data={data}
                            setPrompt={setPrompt}
                            scrollToBottom={scrollToBottom}
                        />
                    </div>
                    <div className="card m-0 p-2">
                        <ChataiProjectPromptPage key="prompt" setPrompt={setPrompt} prompt={prompt} getChatAiResponse={getClaude3OpusResponse} patchResponse={patchResponse} />
                    </div>
                    {/* {showBottomScroller ? <i className="pi pi-sort-down-fill scalein animation-delay-300 animation-duration-500 animation-iteration-infinite"></i> : <i className="pi pi-sort-up-fill scalein animation-delay-300 animation-duration-500 animation-iteration-infinite"></i>} */}
                </div>
            )}
        </>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(ChataiProjectLayoutPage);
