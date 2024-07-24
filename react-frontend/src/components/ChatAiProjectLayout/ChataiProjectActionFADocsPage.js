import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import client from '../../services/restClient';
import { TabView, TabPanel } from 'primereact/tabview';
import { Checkbox } from 'primereact/checkbox';

const ChataiProjectActionFADocsPage = (props) => {
    const [refFaDocs, setRefFaDocs] = useState([]);

    useEffect(() => {
        //on mount
        getRefFADocs();
    }, []);

    const getRefFADocs = () => {
        client
            .service('reffadocs')
            .find({ query: { $limit: 10000 } })
            .then((res) => {
                let results = res.data;
                if (results) {
                    setRefFaDocs(results);
                    props.setDocuments(results.map((doc) => doc._id));
                    props.setNumFiles(results.length);
                }
            })
            .catch((error) => {
                props.alert({
                    title: 'fa docs',
                    type: 'error',
                    message: error.message || 'Failed get reffadocs'
                });
            });
    };

    const onDocumentsChange = (e) => {
        console.log(e);
        if (!props.documents || !e) return;
        let _documents = [...props.documents];

        if (e?.checked) _documents.push(e.value);
        else _documents.splice(_documents.indexOf(e.value), 1);

        props.setDocuments(_documents);
    };

    return (
        <div className="card">
            <h3>The documents </h3>
            <TabView>
                <TabPanel header="Conventional">
                    <div class="flex flex-wrap flex-column justify-content-start gap-3" style={{ minHeight: '100px' }}>
                        {refFaDocs.map((doc, i) => (
                            <div className="flex align-items-center font-bold" style={{ minWidth: '200px', minHeight: '10px' }}>
                                <Checkbox key={doc?._id} onChange={onDocumentsChange} inputId={doc?._id} value={doc?._id} checked={props.documents.includes(doc?._id)}></Checkbox>
                                <label htmlFor={doc?._id} className="ml-3">
                                    {doc.filename}
                                </label>
                            </div>
                        ))}
                    </div>
                </TabPanel>

                <TabPanel header="Islamic">
                    <div class="flex flex-column" style={{ minHeight: '100px' }}>
                        <div className="flex align-self-auto  justify-content-start font-bold m-2" style={{ minWidth: '200px', minHeight: '10px' }}>
                            <p className="m-0">Empty</p>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
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

export default connect(mapState, mapDispatch)(ChataiProjectActionFADocsPage);
