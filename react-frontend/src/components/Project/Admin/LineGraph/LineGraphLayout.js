import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';

const LineGraphLayout = (props) => {
    const menu3 = useRef(null);
    const menu4 = useRef(null);
    const items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];

    return (
        <>
            <div className="col-12 lg:col-6">
                <div className="surface-card shadow-2 border-round p-4">
                    <div className="flex align-items-center justify-content-between mb-3">
                        <div className="text-900 font-medium text-xl">Sales</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded" onClick={(event) => menu3.current.toggle(event)} />
                            <Menu ref={menu3} popup model={items} />
                        </div>
                    </div>
                    <img src="/assets/images/blocks/chart/chart-line.svg" alt="chart-line" className="w-full" />
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="surface-card shadow-2 border-round p-4">
                    <div className="flex align-items-center justify-content-between mb-3">
                        <div className="text-900 font-medium text-xl">Customers</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded" onClick={(event) => menu4.current.toggle(event)} />
                            <Menu ref={menu4} popup model={items} />
                        </div>
                    </div>
                    <img src="/assets/images/blocks/chart/chart-bar.svg" alt="chart-bar" className="w-full" />
                </div>
            </div>
        </>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(LineGraphLayout);
