import React, { Component } from 'react';

export function asyncComponent({prefix, loadManifest}) {
    class AsyncComponent extends Component {
        static Component = null;
        state = {Component: AsyncComponent.Component};

        componentDidMount() {
            if (!this.state.Component) {
                loadManifest().then(manifest => {
                    const {
                        componentName
                    } = manifest;
                    const script = document.createElement('script');
                    script.src = `${prefix}/${manifest['subApp.js']}`;
                    script.type = 'text/javascript';
                    script.onload = () => {
                        const Component = window[componentName];
                        AsyncComponent.Component = Component;
                        this.setState({Component});
                    };
                    document.body.appendChild(script);
                });
            }
        }

        render() {
            const {Component} = this.state;

            if (Component) {
                return <Component {...this.props} />;
            }

            return null;
        }
    }

    return AsyncComponent;
}