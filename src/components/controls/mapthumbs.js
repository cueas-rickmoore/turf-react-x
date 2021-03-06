import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
class TreatmentMapThumbnail extends React.Component {

  clickHandler(the_date) {
    this.props.stores.datestore.updateMapDate(the_date);
  }

  render() {
    let model = this.props.stores.models.model;
    let the_date = this.props.the_date;

    let alt_date = the_date.format('MMMM Do Y');
    let label = the_date.format('MM/DD/Y');
    let url_date = the_date.format('YMMDD');

    let alt = model.dashboard.altString.replace('ALTDATE',alt_date)
                   .replace('/TREATMENT/gi',this.props.treatment);
    let url = this.props.stores.appstore.urlTemplate(model,'thumbs')
                  .replace('YEAR', the_date.format('Y'))
                  .replace('DATESTR', url_date)
                  .replace(/TREATMENT/gi, this.props.treatment);

    let div_key = 'tmb' + url_date;
    let img_key = 'tmbimg' + url_date;
    let span_key = 'tmblbl' + url_date;

    return(
      <div key={div_key} className="map-thumb" onClick={this.clickHandler.bind(this, the_date)}>
        <img key={img_key} className="thumbnail" src={url} alt={alt} />
        <br/><span key={span_key} className="thumbnail-date">{label}</span>
      </div>
    )
  }
}

@inject("stores")
@observer
class TreatmentMapThumbnails extends React.Component {

  render() {
    let model = this.props.stores.models.model;
    let map_date = this.props.stores.datestore.mapDate;
    let start_date = this.props.stores.datestore.firstThumbDate.clone();
    console.log('TreatmentMapThumbnails.render contentKey = ' + this.props.stores.appstore.contentKey);
    let treatment = model.treatments[this.props.stores.appstore.contentKey].fullname;

    let the_dates = [ ];
    if (start_date.diff(map_date, 'd') !== 0) { the_dates.push(start_date); }
    for (let i=1; i < model.dashboard.thumbs.count; i++) {
        let the_date = start_date.clone().add(i, 'd');
        if (the_date.diff(map_date, 'd') !== 0) { the_dates.push(the_date); }
    }
    let groups = [ ]; 
    if (the_dates.length > 3) {
      groups.push(the_dates.slice(0,3));
      if (the_dates.length <= 6) {
        groups.push(the_dates.slice(3));
      } else {
        groups.push(the_dates.slice(3,6));
        groups.push(the_dates.slice(6));
      }
    }
    if (groups.length > 0) {
      return (
        <div className="turf-map-thumbnails">
           { groups.map( function(group,g) {
              let row_key = 'mapthumbs-row-' + g;
              return (
                <div className="turf-thumbnail-row" key={row_key}>
                { group.map( function(the_date,i) {
                  let thmb_key = 'mapthumb' + the_date.format('YMMDD');
                  return <TreatmentMapThumbnail key={thmb_key} the_date={the_date} treatment={treatment}/>;
                  } )
                }
                </div>
              ) }
           ) }
        </div>
      )

    } else {
      return (
        <div className="turf-map-thumbnails">
          { the_dates.map( function(the_date,i) {
            let key_string = 'mapthumb' + the_date.format('YMMDD');
            return <TreatmentMapThumbnail key={key_string} the_date={the_date} treatment={treatment}/>;
            } )
          }
        </div>
      )
    }
  }
}

export default TreatmentMapThumbnails;
