import React , { useMemo } from "react";
import * as THREE from "three";
import "./Loader.css";
import LoaderIcon from "./load.png"
import {useFrame } from '@react-three/fiber'


const Texture = ({ texture }) => {
    const myMesh = React.useRef()

    useFrame(() => {
      myMesh.current.rotation.z += 300
    })
    return (
      <mesh ref={myMesh}>
        <planeBufferGeometry attach="geometry"  />
        <meshBasicMaterial attach="material" scale={[0.9,0,0]} transparent map={texture} />
      </mesh>
    );
  };

  const Image = ({ url }) => {
    const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
    return <Texture texture={texture} />;
  };

function Loading() {
  return (

    <Image url={LoaderIcon} />
  );
}

export default Loading;
