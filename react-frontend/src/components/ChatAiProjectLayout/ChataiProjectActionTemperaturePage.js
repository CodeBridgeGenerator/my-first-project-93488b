import React from 'react';
import { connect } from 'react-redux';
import { Chip } from 'primereact/chip';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';

const ChataiProjectActionTemperaturPage = (props) => {
    const reset = () => {
        props.setTemperature(50);
        props.setTopK(50);
        props.setTopP(50);
        props.setMaxLength(50);
        props.setNumTemp(50);
    };
    return (
        <div className="card grid grid-nogutter " style={{ maxWidth: '300px' }}>
            <div className="col-11">
                <h3>The parameters</h3>
            </div>
            <div className="col-1">
                <Button icon="pi pi-fw pi-refresh" className="" size="small" rounded text tooltip="reset" tooltipOptions={{ position: 'bottom' }} severity="primary" aria-label="refresh" onClick={reset} />
            </div>

            <div className="col-12">
                <label id="label_temperature" className="mb-2 flex justify-content-center">
                    temp. {(props?.temperature).toFixed(2)} &#176;C
                </label>
                <span className="text-sm">strict=0</span>
                <Slider value={props.temperature * 100} onChange={(e) => props.setTemperature(e.value / 100)} step={0.2} />
                <span className="flex justify-content-end text-sm">hallucinate=1</span>
            </div>

            <div className="col-12 mt-2">
                <label id="label_topK" className="mb-2 flex justify-content-center">
                    TopK {props.topK.toFixed(0)}
                </label>
                <span className="text-sm">0</span>
                <Slider value={props.topK / 5} onChange={(e) => props.setTopK(e.value * 5)} step={10} />
                <span className="flex justify-content-end text-sm">500</span>
            </div>

            <div className="col-12 mt-2">
                <label id="label_topP" className="mb-2 flex justify-content-center">
                    TopP {props.topP.toFixed(2)}
                </label>
                <span className="text-sm">0</span>
                <Slider value={props.topP * 100} onChange={(e) => props.setTopP(e.value * 0.01)} step={0.1} />
                <span className="flex justify-content-end text-sm">1</span>
            </div>
            <div className="col-12 mt-2">
                <label id="label_topP" className="mb-2 flex justify-content-center">
                    Max length {props.maxLength.toFixed(0)}
                </label>
                <span className="text-sm">0</span>
                <Slider value={(props.maxLength / 4096) * 100} onChange={(e) => props.setMaxLength((e.value / 100) * 4096)} step={4 / 5} />
                <span className="flex justify-content-end text-sm">4096</span>
            </div>
            <div className="col-12 mt-2">
                <label id="label_stop" className="mb-2 flex justify-content-center">
                    Stop Sequence{' '}
                    <span className="ml-1">
                        {/* <i
              className="pi pi-fw pi-plus"
              style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
            ></i> */}
                    </span>
                </label>
                <Chip label="Human" />
            </div>
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

export default connect(mapState, mapDispatch)(ChataiProjectActionTemperaturPage);
