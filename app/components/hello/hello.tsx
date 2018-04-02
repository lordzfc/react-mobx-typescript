import * as React from "react";
import * as styles from './Hello.css';


export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        console.log(styles.hello.toString())
        return <h1 className={styles.hello}>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}