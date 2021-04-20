import MyJson from '../data/cities.json';
import MyJsonAll from '../data/citizens.json';
import { useState, useEffect, useRef } from 'react';
import { OverlayTrigger, Tooltip, Overlay } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataShow() {
  const [somethingData, setSomethingData] = useState([{
    street: '', district: '', region: '', group: [],
  }]);
  const [newSe, stNewSe] = useState([{ 'Москва г.': [], 'Воронеж г.': [], 'Санкт-Петербург г.': [] }]);
  const [coordinateX, setCoordinateX] = useState('');

  const getCoordinate = (e) => {
    setCoordinateX(e.screenX);
  };

  const regions = MyJson;
  const regionsCol = ['Москва', 'Воронеж', 'Санкт-Петербург'];
  const datas = MyJson.map((item) => item.data);
  const Logic = () => {
    const data = MyJsonAll;
    const bigData = [];
    for (let j = 0; j < regions.length; j++) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].groups[0].name == `${regionsCol[j]} г.`) {
          bigData.push({
            name: data[i].name,
            region: data[i].groups[0].name,
            district: data[i].groups[1].name,
            street: data[i].groups[2].name,

          });
        }
      }
    }

    const groupBys = bigData.reduce((r, {
      street, district, region, ...object
    }) => {
      let temp = r.find((o) => o.street === street && o.district === district && o.region === region);
      if (!temp) {
        r.push(temp = {
          street, district, region, group: [],
        });
      }
      temp.group.push(object);
      return r;
    }, []);
    const result = groupBys.reduce((r, a) => {
      r[a.region] = r[a.region] || [];
      r[a.region].push(a);
      return r;
    }, Object.create(null));
    stNewSe([result]);
  };


  useEffect(() => {
    Logic();
  }, []);


  return (
    <div className="TestDataShow">
      {regions.map((regItem, index) => (
        <h4 style={{ marginLeft: '100px' }}>
          {regItem.name}
          <h4 style={{ marginLeft: '100px' }}>
            {newSe.map((item) => (
              <h4>
                {item[regItem.name].map((t) => (
                  <h4>
                    {t.district}
                    <h4 style={{ marginLeft: '100px' }}>{t.street}</h4>
                    <OverlayTrigger
                        overlay={(
                            <Tooltip style={{ marginLeft: `-${1100 - coordinateX}px` }} id={`tooltip-${index}`}>
                                {regItem.name}
                                {' '}
                                {regItem.data}
                                {' '}
                                людей</Tooltip>
                                          )}
                      >
                        <h4 onMouseMove={(e) => getCoordinate(e)} style={{ marginLeft: '100px' }}>{t.group.map((t) => `${t.name} `)}</h4>
                      </OverlayTrigger>
                  </h4>
                ))}
              </h4>
            ))}
          </h4>
        </h4>
      ))}
    </div>
  );
}

export default DataShow;
