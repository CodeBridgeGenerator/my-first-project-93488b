import React, { useState, useEffect } from 'react';
import '../Layouts/ProjectLayout.css';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import './ChatAiProjectLayout.css';

const ChataiProjectResponsePage = (props) => {
    const [up, setUp] = useState(props.data?.thumbsUp || false);
    const [down, setDown] = useState(props.data?.thumbsDown || false);
    const [showRemarks, setShowRemarks] = useState(false);
    const [showRemarksEditor, setShowRemarksEditor] = useState(false);
    const [remarks, setRemarks] = useState(props.data?.userRemarks || '');
    const urlParams = useParams();

    useEffect(() => {
        setDown(false);
        setUp(false);
        if (props?.data) {
            if (props?.data.thumbsUp) setUp(true);
            if (props?.data.thumbsDown) setDown(true);
        }
    }, [urlParams.promptId]);

    const emailToFunction = () => {
        const userEmail = props.user.email;
        const content = `Prompt:%20${props.data?.prompt}%20Response:%20${props.data?.responseText}`;
        return `mailto:${userEmail}?subject=ASL&body=${content}`;
    };

    const copyToClipBoard = () => {
        const content = `Prompt: ${props.responsePrompt}/n Response: ${props.stringToCRLF(props.response)}`;
        navigator.clipboard.writeText(content);
        props.alert({
            type: 'success',
            title: 'Copied to clipboard',
            message: 'Prompt and response'
        });
    };

    const setThumbs = (like) => {
        setDown(false);
        setUp(false);
        if (like === 'up') {
            if (up === null) setUp(true);
            else if (up === true) setUp(false);
            else if (up === false) setUp(null);
        } else {
            if (down === null) setDown(true);
            else if (down === true) setDown(false);
            else if (down === false) setDown(null);
        }
    };

    const initialPage = () => {
        return (
            <div className="grid grid-nogutter flex">
                <div className="col-5 min-h-max fadein animation-duration-1000 flex flex-wrap align-items-center">
                    <span className="vertical-align-middle">
                        <h2 className="ml-8">What's your objective?</h2>
                    </span>
                </div>
                <div className="grid flex justify-content-center mt-3">
                    <div className="card col-4">Interrogate your data</div>
                    <div className="card col-offset-1 col-4">Comparative Analysis</div>
                    <div className="card col-4">Rewrite documents</div>
                    <div className="card col-offset-1 col-4">Genearate documents</div>
                </div>
            </div>
        );
    };

    const responsePage = () => {
        return (
            <div>
                <div className="grid p-0">
                    <div className="col-2 vertical-align-middle">
                        <Button
                            label="Re-Prompt"
                            icon="pi pi-play-circle"
                            className="m-2"
                            size="small"
                            iconPos="left"
                            text
                            disabled={!props.data?.prompt}
                            severity="primary"
                            aria-label="ReRun"
                            onClick={() => {
                                if (props.data?.prompt) {
                                    props.setPrompt(props.data.prompt);
                                    props.scrollToBottom();
                                }
                            }}
                        ></Button>
                    </div>
                    <div className="col-10">
                        <div id="prompt" className="p-5 border-x-1 border-round-3xl border-blue-500">
                            <b>Prompt:</b>
                            <p className="mt-2 ml-8 line-height-4 white-space-normal">{props.responsePrompt}</p>
                        </div>
                    </div>
                    <div className="col-12 flex justify-content-between">
                        <Button
                            key={`${urlParams.promptId || props?.currentPromptId}-up-button`}
                            label="Up"
                            icon={up ? 'pi pi-thumbs-up-fill' : 'pi pi-thumbs-up'}
                            className="m-2"
                            size="small"
                            iconPos="left"
                            rounded
                            text
                            severity="primary"
                            aria-label="Up"
                            onClick={() => {
                                setThumbs('up');
                                setDown(null);
                                props.patchResponse(
                                    {
                                        currentPromptId: urlParams.promptId || props.currentPromptId,
                                        data: { thumbsUp: up === null }
                                    },
                                    up === null ? 'Saved user Thumbs Up, thank you.' : 'Write your remarks on how to improve!',
                                    'Failed to save thumbs up'
                                );
                            }}
                        />
                        <Button
                            key={`${urlParams.promptId || props?.currentPromptId}-down-button`}
                            label="Down"
                            icon={down ? 'pi pi-thumbs-down-fill' : 'pi pi-thumbs-down'}
                            className="m-2"
                            size="small"
                            iconPos="left"
                            rounded
                            text
                            severity="primary"
                            aria-label="Down"
                            onClick={() => {
                                setThumbs('down');
                                setUp(null);
                                props.patchResponse(
                                    {
                                        currentPromptId: urlParams.promptId || props.currentPromptId,
                                        data: { thumbsDown: down === null }
                                    },
                                    down === null ? 'Saved user Thumbs Down, thank you.' : 'Write your remarks on how to improve!',
                                    'Failed to save thumbs down'
                                );
                            }}
                        />
                        <Button
                            key={`${urlParams.promptId || props?.currentPromptId}-rem-button`}
                            label="Remarks"
                            icon="pi pi-book"
                            className="m-2"
                            size="small"
                            iconPos="left"
                            rounded
                            text
                            severity="primary"
                            aria-label="Remarks"
                            onClick={() => {
                                setShowRemarksEditor(true);
                            }}
                        />
                        <Button
                            key={`${urlParams.promptId || props?.currentPromptId}-remarks-button`}
                            label="View"
                            icon="pi pi-arrows-alt"
                            className="m-2"
                            size="small"
                            iconPos="left"
                            text
                            disabled={props.data?.userRemarks === ''}
                            severity="primary"
                            aria-label="Rem"
                            onClick={() => {
                                setShowRemarks(true);
                            }}
                        />
                        <Button
                            key={`${urlParams.promptId || props?.currentPromptId}-cp-button`}
                            label="Copy"
                            icon="pi pi-copy"
                            className="m-2"
                            size="small"
                            iconPos="left"
                            rounded
                            text
                            severity="primary"
                            aria-label="Copy"
                            onClick={() => {
                                copyToClipBoard();
                                props.patchResponse(
                                    {
                                        currentPromptId: urlParams.promptId || props.currentPromptId,
                                        data: { copied: true }
                                    },
                                    'Saved copied',
                                    'Failed to save copy'
                                );
                            }}
                        />

                        {/* <div className="flex flex-row">
            <i
              className="ml-4 mt-1 pi pi-envelope"
              style={{ fontSize: "0.8rem", color: 'var(--primary-color)' }}
            ></i>
              <a
                className="ml-3"
                icon="pi pi-users"
                key={`${urlParams.promptId || props?.currentPromptId}-em-button`}
                href={emailToFunction()}
                // href="mailto:kana@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  props.patchResponse(
                    {
                      currentPromptId:
                        urlParams.promptId || props.currentPromptId,
                      data: { emailed: true },
                    },
                    "Saved user Email To",
                    "Failed to save user email to"
                  );
                }}
              >
                <small>Email</small>
              </a>
            </div> */}
                    </div>
                    <div className="col-12 ml-3">
                        <div id="response" className="scrollable line-height-4 white-space-normal list-decimal" dangerouslySetInnerHTML={{ __html: props.response }}></div>
                    </div>
                </div>

                <Dialog header="Write Remarks" visible={showRemarksEditor} style={{ width: '50vw' }} onHide={() => setShowRemarksEditor(false)}>
                    <Editor value={props.responseRemarks} onTextChange={(e) => setRemarks(e.htmlValue)} style={{ height: '350px' }} />
                    <div className="flex justify-content-end ">
                        <Button
                            text
                            type="submit"
                            label="Save"
                            onClick={() => {
                                props.patchResponse(
                                    {
                                        currentPromptId: urlParams.promptId || props.response?._id,
                                        data: { userRemarks: remarks }
                                    },
                                    'Saved user Remarks',
                                    'Failed to save remarks'
                                );
                                setShowRemarksEditor(false);
                            }}
                        />
                    </div>
                </Dialog>
                <Dialog
                    header="View Remarks"
                    visible={showRemarks}
                    style={{
                        width: 'fit-content',
                        maxWidth: '80vw',
                        height: 'fit-content',
                        maxHeight: '80vh'
                    }}
                    onHide={() => setShowRemarks(false)}
                >
                    <p className="ml-8 line-height-4 white-space-normal" dangerouslySetInnerHTML={{ __html: props.data?.userRemarks }}></p>
                </Dialog>
            </div>
        );
    };

    const errorPage = () => {
        return (
            <div className="mt-3 overflow-hidden flex justify-content-center m-3 sc" style={{ height: '45vh' }}>
                {props.error}
            </div>
        );
    };

    if (props.error) {
        return errorPage();
    } else if (props.response) {
        return responsePage();
    } else return initialPage();
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(ChataiProjectResponsePage);
