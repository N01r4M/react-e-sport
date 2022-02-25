import React from "react";
import Pagination from "react-bootstrap/Pagination";

export default class PaginationBar extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let paginationItems = []
        for (let nb = 1; nb <= this.props.nbPages; nb++) {
            paginationItems.push(<Pagination.Item key={nb} active={nb === this.props.page} href={this.props.url.concat('', nb)}>{nb}</Pagination.Item>)

        }
        return (
            <Pagination>
                <Pagination.Prev disabled={1 === this.props.page} href={this.props.url.concat('', parseInt(this.props.page) - 1)} />
                {paginationItems}
                <Pagination.Next disabled={this.props.nbPages === this.props.page} href={this.props.url.concat('', parseInt(this.props.page) + 1)} />
            </Pagination>
        );
    }
}