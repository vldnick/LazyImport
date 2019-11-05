import React, {Component} from 'react';
import { render } from 'react-dom';


function asyncComponent({ prefix, loadManifest }) {
    class AsyncComponent extends Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                loadManifest().then(manifest => {
                    console.log(manifest)
                    const {
                        fileName,
                        componentName
                    } = manifest;
                    const script = document.createElement('script');
                    script.src = `${prefix}/${fileName}.js`;
                    script.type = 'text/javascript';
                    script.onload = () => {
                        const Component = window[componentName];
                        AsyncComponent.Component = Component;
                        this.setState({ Component });
                    };
                    document.body.appendChild(script);
                });
            }
        }
        render() {
            const { Component } = this.state;

            if (Component) {
                return <Component {...this.props} />;
            }

            return null;
        }
    }
    return AsyncComponent;
}

const LazyComponent = asyncComponent({
    prefix: 'pr2/dist',
    loadManifest: () =>
        fetch('pr2/dist/manifest.json').then(resp => resp.json())
});

class Hello extends Component {
    state = {
        showLazyComponent: false
    }

    showComponent() {
        this.setState({
            showLazyComponent: true
        })
    }

    render() {
        return (
            <div>
                <h1>Hello main App</h1>
                <button onClick={() => this.showComponent()}>Show component</button>
                {this.state.showLazyComponent && <LazyComponent />}
            </div>
        )
    }
}


render(<Hello/>, document.getElementById('app'));
