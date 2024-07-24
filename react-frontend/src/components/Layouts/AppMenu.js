import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';

const AppSubmenu = (props) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const location = useLocation();

    const onMenuItemClick = (event, item, index) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        if (index === activeIndex) setActiveIndex(null);
        else setActiveIndex(index);

        if (props.onMenuItemClick) {
            props.onMenuItemClick({
                originalEvent: event,
                item: item
            });
        }
    };

    const onKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            event.target.click();
        }
    };

    const renderLinkContent = (item) => {
        const submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
        const badge = item.badge && <Badge value={item.badge} />;
        const activePage = () => location.pathname.split('/')[1] === item.to.split('/')[1];
        const icon = item.iconAsImg ? <img src={item.iconAsImg} alt={item.label + '-icon'} style={{ width: '1.1rem' }} /> : <i className={item.icon} style={activePage() ? { color: 'red' } : null}></i>;
        const label = item.inDev ? (
            <span className="relative ">
                {item.label}
                <Badge
                    value="IN DEV"
                    className="bg-cyan-500"
                    style={{
                        transform: 'scale(0.8)',
                        position: 'absolute',
                        right: '-4rem'
                    }}
                ></Badge>
            </span>
        ) : (
            <span className={classNames({ 'text-xl': activePage() })}>{item.label}</span>
        );
        return (
            <React.Fragment>
                {icon}
                {label}
                {submenuIcon}
                {badge}
                <Ripple />
            </React.Fragment>
        );
    };

    const renderLink = (item, i) => {
        let content = renderLinkContent(item);

        if (item.to) {
            // activeClassName="router-link-active router-link-exact-active"
            return (
                <NavLink aria-label={item.label} onKeyDown={onKeyDown} role="menuitem" className="overflow-visible p-ripple" to={item.to} onClick={(e) => onMenuItemClick(e, item, i)} exact target={item.target}>
                    {content}
                </NavLink>
            );
        } else {
            return (
                <a tabIndex="0" aria-label={item.label} onKeyDown={onKeyDown} role="menuitem  " href={item.url} className="overflow-visible p-ripple" onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
                    {content}
                </a>
            );
        }
    };

    let items =
        props.items &&
        props.items.map((item, i) => {
            let active = activeIndex === i;
            let styleClass = classNames(item.badgeStyleClass, {
                'layout-menuitem-category': props.root,
                'active-menuitem': active && !item.to
            });

            if (props.root) {
                return (
                    <li className={styleClass} key={i} role="none">
                        {props.root === true && (
                            <React.Fragment>
                                <div className="layout-menuitem-root-text" aria-label={item.label}>
                                    {item.label}
                                </div>
                                <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
                            </React.Fragment>
                        )}
                    </li>
                );
            } else {
                return (
                    <li className={styleClass} key={i} role="none">
                        {renderLink(item, i)}
                        <CSSTransition classNames="layout-submenu-wrapper" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
                            <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
                        </CSSTransition>
                    </li>
                );
            }
        });

    return items ? (
        <ul className={props.className} role="menu">
            {items}
        </ul>
    ) : null;
};

export const AppMenu = (props) => {
    return (
        <div className="layout-menu-container">
            <AppSubmenu items={props.model} className="layout-menu" onMenuItemClick={props.onMenuItemClick} root={true} role="menu" />
        </div>
    );
};
