import * as React from "react";
import DevTools from 'mobx-react-devtools';
import { Hello } from "./components/hello/hello";

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component<{}> {
    render() {
        return <div>
            <h1>App!</h1>
            <Hello compiler="TypeScript" framework="React" />
            <DevTools />
        </div>;
    }
}