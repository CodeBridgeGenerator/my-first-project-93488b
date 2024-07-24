import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Editor } from "primereact/editor";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const TemplatesCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization({ ...props?.entity, ...init }, [], setError);
    }
    set_entity({ ...init });
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      name: _entity?.name,
      subject: _entity?.subject,
      body: _entity?.body,
      variables: _entity?.variables,
      image: _entity?.image,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("templates").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Templates created successfully",
      });
      props.onCreateResult(result);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Templates",
      });
    }
    setLoading(false);
  };

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  return (
    <Dialog
      header="Create Templates"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="templates-create-dialog-component"
      >
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="name">Name:</label>
            <InputText
              id="name"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.name}
              onChange={(e) => setValByKey("name", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="subject">Subject:</label>
            <InputTextarea
              id="subject"
              rows={5}
              cols={30}
              value={_entity?.subject}
              onChange={(e) => setValByKey("subject", e.target.value)}
              autoResize
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["subject"]) ? (
              <p className="m-0" key="error-subject">
                {error["subject"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 field mt-5">
          <span className="align-items-center">
            <label htmlFor="body">Body:</label>
            <Editor
              id="body"
              value={_entity?.body}
              onTextChange={(e) => setValByKey("body", e.htmlValue)}
              style={{ height: "320px" }}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["body"]) ? (
              <p className="m-0" key="error-body">
                {error["body"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="variables">Variables:</label>
            <InputTextarea
              id="variables"
              rows={5}
              cols={30}
              value={_entity?.variables}
              onChange={(e) => setValByKey("variables", e.target.value)}
              autoResize
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["variables"]) ? (
              <p className="m-0" key="error-variables">
                {error["variables"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="image">Image:</label>
            <InputText
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.image}
              onChange={(e) => setValByKey("image", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["image"]) ? (
              <p className="m-0" key="error-image">
                {error["image"]}
              </p>
            ) : null}
          </small>
        </div>
        <small className="p-error">
          {Array.isArray(Object.keys(error))
            ? Object.keys(error).map((e, i) => (
                <p className="m-0" key={i}>
                  {e}: {error[e]}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(TemplatesCreateDialogComponent);
