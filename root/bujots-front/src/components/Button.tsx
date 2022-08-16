import React, { Component, MouseEvent } from 'react'

type Props = {
    styles?: String,
    handler?: (e: MouseEvent) => void,
    value?: String
};

export default class Button extends Component<Props> {
    render() {
        const styles = this.props.styles ? this.props.styles : "";
        const handler = this.props.handler;
        const value = this.props.value;
        return (
            <button
                className={`${styles}`}
                onClick={handler}
            >
                {value}
            </button>
        )
    }
}
