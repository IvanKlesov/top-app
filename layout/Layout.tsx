import { LayoutProps } from "./Layout.props";
import styles from './Layout.module.css';
import cn from 'classnames';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import {Sidebar} from './Sidebar/Sidebar';
import React, { FunctionComponent, useState, KeyboardEvent, useRef } from "react";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components/Up/Up";



const Layout = ({children}: LayoutProps): JSX.Element => {
    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (key: KeyboardEvent) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault();
            bodyRef.current?.focus();
            setIsSkipLinkDisplayed(false);
        } else {
            setIsSkipLinkDisplayed(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <a
                tabIndex={0}
                className={cn(styles.skipLink, {
                    [styles.displayed]: isSkipLinkDisplayed
                })}
                onFocus={() => setIsSkipLinkDisplayed(true)}
                onKeyDown={skipContentAction}
            >Сразу к содержанию</a>
            <Header className={styles.header} children={children}/>            
            <Sidebar className={styles.sidebar} children={children} />
            <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
                {children}
            </main>            
            <Footer className={styles.footer} children={children} />
            <Up />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};