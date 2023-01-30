import Image from "next/image";
import styles from "../components/All.module.css";
import { useState, useEffect } from 'react'

function Body() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3001/read')
    
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  console.log(data);
  if (isLoading) return <div className={styles.container}><div className={styles.cardbody}><h4>Loading . . . Please Wait</h4></div></div>
  if (!data) return <div className={styles.container}><div className={styles.cardbody}><h4>No Data (┬┬﹏┬┬)</h4></div></div>
  function converter(toconv) {
    var img = Buffer.from(toconv).toString('latin1');
    return img
  }
  function convertDate(toconv) {
    const chars = {"Z": " ", "T": " "};
    var date = toconv.replace(/[TZ]/g, m => chars[m])
    //Date: 2022-10-23 02:16:55.000
    var year = toconv.slice(0,4);
    var idx = toconv.slice(5,7);
    var day = toconv.slice(8,10);
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = monthList[idx-1];
    var date = `${month} ${day}, ${year}`;
    return date;
  }
  function convertTime(toconv) {
    var time = toconv.slice(11, 19);
    return time;
  }
    return (
        <div className={styles.container}>
          {/* <h1>Captured Images</h1><br/> */}
          <div className={styles.card}>
            {data.img.map((d) => {
            return (
              <div className={styles.cardbody}>
                <div><Image src={`data:image/png;base64,${converter(d.capture)}`} alt = "captured image" width={450} height={300}/></div>
                <div><h4>{`Date: ${convertDate(d.datetime)}`}</h4></div>
                <div><h4>{`Time: ${convertTime(d.datetime)}`}</h4></div>
              </div>
            )})}
          </div>
        </div>
      );
};

export default Body;