import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { CascadeSelect } from 'primereact/cascadeselect';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Badge } from 'primereact/badge';
import ChataiProjectActionBehaviorsPage from './ChataiProjectActionBehaviorsPage';
import ChataiProjectActionTemperaturPage from './ChataiProjectActionTemperaturePage';
import ChataiProjectActionFADocsPage from './ChataiProjectActionFADocsPage';

const ChataiProjectActionPage = (props) => {
    const opTemperature = useRef();
    const opFABehavior = useRef();
    const opFACDocsConfig = useRef();
    const [numFiles, setNumFiles] = useState(2);
    const [numTemp, setNumTemp] = useState(0.5);

    const chatAis = [
        {
            name: 'Interrogate your data',
            code: 'ID',
            actions: [
                {
                    name: 'Factual Queries',
                    models: [
                        {
                            description: 'LLMs can answer factual questions by understanding the context provided in the prompt and generating relevant responses.',
                            cname: 'Claude Opus 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                },
                {
                    name: 'Untrained Queries',
                    models: [
                        {
                            description: "Zero-shot or few-shot learning approaches enable LLMs to answer questions even if they haven't been explicitly trained on the specific task.",
                            cname: 'Untrained Query CB 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                }
            ]
        },
        {
            name: 'Comparative Analysis',
            code: 'CA',
            actions: [
                {
                    name: 'Different concepts',
                    models: [
                        {
                            description: 'LLMs can compare different entities or concepts by analyzing the similarities and differences in the context.',
                            cname: 'Comparison concepts 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                },
                {
                    name: 'Generated summaries',
                    models: [
                        {
                            description: 'For textual comparison, LLMs can generate descriptions or summaries of each entity and then compare the generated texts.',
                            cname: 'Comparison generated 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                },
                {
                    name: 'Specific types',
                    models: [
                        {
                            description: 'By providing prompts or examples, LLMs can be fine-tuned to perform specific types of comparisons, such as sentiment analysis or product reviews.',
                            cname: 'Comparison specific 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                }
            ]
        },
        {
            name: 'Rewrite documents',
            code: 'RD',
            actions: [
                {
                    name: 'Contextually relevant',
                    models: [
                        {
                            description: 'LLMs excel at generating coherent and contextually relevant text based on a given prompt or input.',
                            cname: 'Generate context 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                },
                {
                    name: 'Content recreation',
                    models: [
                        {
                            description: 'Text regeneration can be used for various applications such as content creation, storytelling, code generation, dialogue generation, and more.',
                            cname: 'Generate content 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                }
            ]
        },
        {
            name: 'Genearate documents',
            code: 'GD',
            actions: [
                {
                    name: 'Contextually relevant',
                    models: [
                        {
                            description: 'LLMs excel at generating coherent and contextually relevant text based on a given prompt or input.',
                            cname: 'Generate context 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                },
                {
                    name: 'Content creation',
                    models: [
                        {
                            description: 'Text generation can be used for various applications such as content creation, storytelling, code generation, dialogue generation, and more.',
                            cname: 'Generate content 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                },
                {
                    name: 'Specific tasks',
                    models: [
                        {
                            description: 'Fine-tuning the model on specific datasets or tasks can improve the quality and relevance of generated text for particular domains.',
                            cname: 'Generate specific 20240307-v1',
                            code: 'anthropic.claude-3-haiku-20240307-v1:0',
                            disabled: true
                        }
                    ]
                }
            ]
        }
    ];

    useEffect(() => {
        //on mount
        if (!props.selectedModel) {
            props.setSelectedModel(chatAis[0]?.actions[0]?.models[0]);
        } else {
            props.setSelectedModel(props.selectedModel);
        }
        props.displayLikeChatGPT(props.selectedModel?.description, props.setDescriptionOnAction);
    }, [props.selectedModel]);

    const chatAiOptionTemplate = (option) => {
        return (
            <div>
                <span className={option.cname ? 'font-bold' : null}>{option.cname || option.name}</span>
                <p
                    className="mt-1 text-xl"
                    style={{
                        whiteSpace: 'pre-line'
                    }}
                >
                    {option.description}
                </p>
            </div>
        );
    };

    return (
        <div className="grid flex w-full m-3 grid-nogutter">
            <div className="col-8">
                <CascadeSelect
                    value={props.selectedModel}
                    onChange={(e) => {
                        props.setSelectedModel(e.value);
                    }}
                    options={chatAis}
                    optionLabel="cname"
                    optionGroupLabel="name"
                    optionGroupChildren={['actions', 'models']}
                    className="w-full md:w-30rem"
                    breakpoint="767px"
                    placeholder="Select an Ai Chat Action"
                    itemTemplate={chatAiOptionTemplate}
                    style={{ maxWidth: 'fit-content' }}
                />
                <Button
                    icon="pi pi-fw pi-plus"
                    className="ml-3 mt-1"
                    label="new question"
                    size="small"
                    rounded
                    text
                    tooltip="reset"
                    tooltipOptions={{ position: 'bottom' }}
                    severity="primary"
                    aria-label="refresh"
                    onClick={() => {
                        props.setPrompt('');
                    }}
                />
                <div className="m-1 overflow-auto">{props.descriptionOnAction}</div>
            </div>
            <div className="col-3 flex justify-content-end">
                {/* <Button
          icon="pi pi-fw pi-file-import"
          className="mb-1"
          size="small"
          tooltip="documents"
          tooltipOptions={{ position: "bottom" }}
          rounded
          text
          severity="primary"
          aria-label="docs"
          onClick={(e) => opFACDocsConfig.current.toggle(e)}
        >
          <span>
            <Badge value={numFiles} severity="success"></Badge>
          </span>
        </Button> */}

                <Button icon="pi pi-fw pi-sliders-h" className="mb-1" size="small" tooltip="hallucinate" tooltipOptions={{ position: 'bottom' }} rounded text severity="primary" aria-label="config" onClick={(e) => opTemperature.current.toggle(e)}>
                    <span>
                        <Badge value={numTemp} severity="info"></Badge>
                    </span>
                    <small>&#8451;</small>
                </Button>
                {/* <Button
          icon="pi pi-fw pi-cog"
          className="mb-1"
          size="small"
          tooltip="prompting"
          tooltipOptions={{ position: "bottom" }}
          rounded
          text
          severity="primary"
          aria-label="fa"
          onClick={(e) => opFABehavior.current.toggle(e)}
        >
          {" "}
          <span>
            <Badge value={props.numConfig + 1} severity="warning"></Badge>
          </span>
        </Button> */}
            </div>
            <OverlayPanel
                ref={opFACDocsConfig}
                pt={{
                    root: { className: 'surface-ground' }
                }}
            >
                <ChataiProjectActionFADocsPage documents={props.documents} setDocuments={props.setDocuments} setNumFiles={setNumFiles} />
            </OverlayPanel>
            <OverlayPanel
                ref={opTemperature}
                pt={{
                    root: { className: 'surface-ground' }
                }}
                className="zoomindown animation-duration-500"
            >
                <ChataiProjectActionTemperaturPage temperature={props.temperature} setTemperature={props.setTemperature} topP={props.topP} setTopP={props.setTopP} topK={props.topK} setTopK={props.setTopK} maxLength={props.maxLength} setMaxLength={props.setMaxLength} setNumTemp={setNumTemp} />
            </OverlayPanel>
            <OverlayPanel
                ref={opFABehavior}
                pt={{
                    root: { className: 'surface-ground' }
                }}
                className="fadeinup animation-duration-500"
            >
                <ChataiProjectActionBehaviorsPage setSelectedConfigId={props.setSelectedConfigId} selectedConfigId={props.selectedConfigId} refUserConfig={props.refUserConfig} setNumConfig={props.setNumConfig} setRefUserConfig={props.setRefUserConfig} />
            </OverlayPanel>
        </div>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(ChataiProjectActionPage);
