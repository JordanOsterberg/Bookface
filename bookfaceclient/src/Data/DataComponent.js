import React from 'react';
import FadeIn from '../FadeIn.js';

class DataComponent extends React.Component {

    constructor(props) {
        super(props)

        this.handleProps(props, false)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.handleProps(nextProps, true)
        }
    }

    handleProps(props, isNext) {
        const interests = props.interests || {};

        let items = Object.keys(interests).map(function(key) {
          return [key, interests[key]];
        });

        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        if (!isNext) {
            this.state = {interests: items, deleteData: props.deleteData};
        } else {
            this.setState({interests: items, deleteData: props.deleteData})
        }
    }

    render() {
        if (this.state.interests.length === 0) {
            return null
        }

        return (<FadeIn style={{marginTop: 20, marginBottom: 60}}><div>
            <h5 style={{marginBottom: 10, fontWeight: 'bold'}}>Your Data</h5>
            <table className="table">
                <thead>
                    <tr>
                        <td scope="col"><strong>Interest</strong></td>
                        <td scope="col"><strong># of Posts</strong></td>
                        <td scope="col"><strong></strong></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.interests.map((interestArray) => {
                        return (
                            <tr key={interestArray[0]}>
                                <th scope="row">{interestArray[0]}</th>
                                <td>{interestArray[1]} click{interestArray[1] === 1 ? "" : "s"}</td>
                                <td><button type="button" className="btn btn-primary" onClick={(e) => this.deleteData(e, interestArray[0])}>Delete Data</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div></FadeIn>)
    }

    deleteData(e, interest) {
        e.preventDefault();

        this.state.deleteData(interest)
    }

}

export default DataComponent;
