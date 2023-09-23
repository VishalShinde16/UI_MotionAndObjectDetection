import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import StartFirebase from './Firebase';
import { ref, onValue, get } from 'firebase/database';
import { saveAs } from 'file-saver';
import BarChart from './BarChart';

import alertAudio from '../Audio/emergency-alarm-with-reverb-29431.mp3'

const MainContainer = styled.div`
    width: 100vw;
    flex: 1;
    overflow-y: scroll;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;

    background: linear-gradient(145deg, rgba(231, 235, 160, 1) 0%, rgba(231, 235, 160, 1) 34%, rgba(238, 130, 238, 0) 100%);

   
`;



const Filter = styled.select`
  margin-left: 4rem;
  margin-top: 3rem;
  align-self: flex-start;
`

const ImageContainer = styled.div`
  /* background-color: white; */
  
  display: flex;
  padding: 2rem;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  width: 100%;
`
const ImageWithLocation = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: whitesmoke;

  border-radius: 0.3rem;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* padding: 1rem; */
  width: 90%;
  height: 70%;
`

const ImageCard = styled.div`
  /* background-color: white; */
  border: 1px solid lightgray;
  /* height: 100%; */
  width: 48%;
  border-radius: 0.3rem;
  /* padding: 1rem; */
`

const Image = styled.img`
  object-fit: fill;
  height: 100%;
  width: 100%;

`
const InfoWithMap = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  padding: 1rem;

`
const Info = styled.div`
  flex: 0.4;
`
const Text = styled.h4`
  font-weight: 400;
  margin-top: 0.5rem;
`
const NameWithBtn = styled.div`
  display: flex;
  justify-content: space-between;
`
const Map = styled.iframe`
  flex:0.6;
  border: 1px solid lightgray;
`
const SaveBtn = styled.button`
  border: none;
  background-color: #e7eba0;
  width: 6rem;
  padding: 0.5rem 1rem;
  color: black;
  border-radius  :0.3rem ;
  cursor: pointer;
`

const db = StartFirebase();
const Main = () => {

  const [allImages, setAllImages] = useState({});
  const [filterName, setFilterName] = useState('');
  const [filteredImages, setFilteredImages] = useState({});

  useEffect(() => {
    const dbRef = ref(db, 'Images');

    onValue(dbRef, (snapshot) => {

      let images = [];
      snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();

        images.push({ "key": keyName, "data": data });
      });
      setAllImages(images[0]['data']);
    })


  }, [])


  // function playAudio(){
  //   let audio = new Audio(alertAudio);
  //   audio.autoplay = true;
  //   audio.muted = true;
  //   audio.play()

  // }
  
  

  useEffect(() => {



    if (allImages && Object.keys(allImages).length > 0) {

      setFilteredImages(allImages);

      // let recent_key = Object.keys(allImages).reverse()[0]
      // if (allImages[recent_key].hasOwnProperty('classes') && allImages[recent_key].classes.includes("person")) {

      //  playAudio();

      // }
    }

  }, [allImages]);

  useEffect(() => {
    getFilterImages()

  }, [filterName])

  const downloadImg = (key) => {
   

    (async () => {
      let name = `${allImages[key].imgName}`;
      let blob = await fetch(allImages[key].imgUrl[0]).then((r) => r.blob());
      saveAs(blob, name);
    })();
  }

  const getFilterImages = () => {

    if (filterName.length > 0) {
      console.log("Filter", filterName);
      console.log("Before processing", filteredImages)
      Object.keys(allImages).forEach(key => {
        if (allImages[key].hasOwnProperty('classes') && allImages[key].classes.includes(filterName)) {
          setFilteredImages(prevFilteredImages => ({
            ...prevFilteredImages,
            [key]: allImages[key]
          }));

        }
      }
      )
    }
    else {
      Object.keys(allImages).forEach(key => {

        setFilteredImages(prevFilteredImages => ({
          ...prevFilteredImages,
          [key]: allImages[key]
        }));

      })
    }
  }

  const handleChange = (e) => {
    setFilterName(e.target.value)
    setFilteredImages({})

  }
  console.log("allImages :", allImages)
  console.log("filteredImages: ", filteredImages)

  return (
    <MainContainer>

      <BarChart />
      <hr></hr>
      <Filter onChange={handleChange}>
        <option value=''>All</option>
        <option value='person'>Humans</option>
        <option value='elephant'>Elephants</option>
      </Filter>
      <ImageContainer>
        {
          Object.keys(filteredImages).reverse().map(key => {

            let detected = "";
            let dict = {};
            if (filteredImages[key].classes) {
              filteredImages[key].classes.forEach(child => {
                if (dict.hasOwnProperty(child)) {
                  dict[child] = dict[child] + 1;
                }
                else {
                  dict[child] = 1;
                }

              })

              Object.keys(dict).forEach(child => {
                detected = detected + dict[child] + " " + child + ", ";

              })

            }

            return (
              <ImageWithLocation key={key}>

                <ImageCard >
                  <Image src={filteredImages[key].imgUrl} />
                </ImageCard>

                <InfoWithMap>
                  <Info>
                    <NameWithBtn>
                      <Text>{filteredImages[key].imgName}</Text>
                      <SaveBtn onClick={() => downloadImg(key)}>Download</SaveBtn>
                    </NameWithBtn>
                    <Text>Date : {filteredImages[key].dateTime.split(" ")[0]}</Text>
                    <Text>Time : {filteredImages[key].dateTime.split(" ")[1]}</Text>
                    <Text>Lat, Long : {`( ${filteredImages[key].latitude}, ${filteredImages[key].longitude} )`}</Text>
                    <Text>Detected : <b>{detected}</b></Text>

                  </Info>
                  <Map
                    src={`https://maps.google.com/maps?q=19.07,72.87&hl=es;&output=embed`}>
                  </Map>
                </InfoWithMap>

              </ImageWithLocation>

            )
          }
          )

        }
      </ImageContainer>
    </MainContainer>
  )
}

export default Main
