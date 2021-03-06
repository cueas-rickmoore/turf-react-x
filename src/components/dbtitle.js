import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
class DashboardTitle extends React.Component {

  render() {
    let model = this.props.stores.models.model;
    return (
      <div className="dashboard-title">{model.description}</div>
    )
  }
}

export default DashboardTitle;
