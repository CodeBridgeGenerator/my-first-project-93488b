import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Mention } from 'primereact/mention';

const ChataiProjectPromptPage = (props) => {
    const [value, setValue] = useState('');
    const [customers, setCustomers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const onUpload = () => {};

    const itemTemplate = (suggestion) => {
        const src = 'https://primefaces.org/cdn/primereact/images/avatar/' + suggestion.representative.image;

        return (
            <div className="flex align-items-center">
                <img alt={suggestion.name} src={src} width="32" />
                <span className="flex flex-column ml-2">
                    {suggestion.name}
                    <small style={{ fontSize: '.75rem', color: 'var(--text-secondary-color)' }}>@{suggestion.nickname}</small>
                </span>
            </div>
        );
    };

    const onSearch = (event) => {
        //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
        setTimeout(() => {
            const query = event.query;
            let suggestions;

            if (!query.trim().length) {
                suggestions = [...customers];
            } else {
                suggestions = customers.filter((customer) => {
                    return customer.nickname.toLowerCase().startsWith(query.toLowerCase());
                });
            }

            setSuggestions(suggestions);
        }, 250);
    };

    return (
        <div className="overflow-hidden flex justify-content-start m-3">
            <div className="flex flex-column gap-2">
                <label htmlFor="prompt" className="font-bold text-xl">
                    Prompt:
                </label>
                <InputTextarea id="prompt" autoResize value={props.prompt} onChange={(e) => props.setPrompt(e.target.value)} placeholder="Prompt the GenAi here ..." cols={100} />
            </div>
            <Button
                label="Run"
                icon="pi pi-send"
                className={`m-2 ${props.prompt ? 'zoomin animation-duration-1000 animation-delay-100 animation-iteration-3 text-xl' : ''}`}
                size="small"
                iconPos="right"
                rounded
                text
                severity="danger"
                aria-label="Run"
                disabled={!props.prompt}
                onClick={() => {
                    props.getChatAiResponse();
                }}
            />

            {/*<FileUpload
        mode="basic"
        chooseLabel="upload image"
        className="mt-3"
        name="files[]"
        url="/api/upload"
        accept="image/*"
        removeIcon
        maxFileSize={1000000}
        onUpload={() => onUpload()}
        disabled={true}
      />*/}
            {/*<Mention
        value={value}
        onChange={(e) => setValue(e.target.value)}
        suggestions={suggestions}
        onSearch={onSearch}
        field="mention"
        className="ml-3"
        placeholder="Enter @ to mention people"
        rows={1}
        cols={30}
        disabled={true}
        itemTemplate={itemTemplate}
    />*/}
        </div>
    );
};

const mapState = (state) => ({
    //
});

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(ChataiProjectPromptPage);
