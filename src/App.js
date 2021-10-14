import React , { Suspense, useRef, useEffect, useState  }  from "react";
import { Canvas,
  useLoader,
  useFrame,
  extend,
  useThree, } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Loader from './Loader';
import './App.css';
extend({ OrbitControls });  

function App() {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);

  const CameraControls = () => {
    const {
      camera,
      gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        enableZoom={false}
        position={[0.5, -0.7, 0]}
        // maxAzimuthAngle={Math.PI / 4}
        // maxPolarAngle={Math.PI}
        // minAzimuthAngle={-Math.PI / 4}
        // minPolarAngle={0}
      />
    );
  };

  function Trainer() {
    const gltf1 = useLoader(GLTFLoader, 'https://farfetch-cors.herokuapp.com/http://dwaynep-marshall.co.uk/1.gltf')
    const gltf2 = useLoader(GLTFLoader, 'https://farfetch-cors.herokuapp.com/http://dwaynep-marshall.co.uk/2.gltf')
    const gltf3 = useLoader(GLTFLoader, 'https://farfetch-cors.herokuapp.com/http://dwaynep-marshall.co.uk/3.gltf')
    const gltf4 = useLoader(GLTFLoader, 'https://farfetch-cors.herokuapp.com/http://dwaynep-marshall.co.uk/4.gltf')
    const gltf5 = useLoader(GLTFLoader, 'https://farfetch-cors.herokuapp.com/http://dwaynep-marshall.co.uk/5.gltf')
    const gltf6 = useLoader(GLTFLoader, 'https://farfetch-cors.herokuapp.com/http://dwaynep-marshall.co.uk/6.gltf')
    const gltf7 = useLoader(GLTFLoader, 'https://farfetch-cors.herokuapp.com/http://dwaynep-marshall.co.uk/7.gltf')
    return (
      <>
        <primitive object={gltf1.scene} scale={0.2} position={0} />
        <primitive object={gltf2.scene} scale={0.2} position={0} />
        <primitive object={gltf3.scene} scale={0.2} position={0} />
        <primitive object={gltf4.scene} scale={0.2} position={0} />
        <primitive object={gltf5.scene} scale={0.2} position={[0.5, -0.8, 0]} />
        <primitive object={gltf6.scene} scale={0.2} position={[0.5, -0.7, 0]} />
        <primitive object={gltf7.scene} scale={0.2} position={0} />
        </>
      
      );
    }
  
    function Box() {
      const myMesh = React.useRef()
  
      useFrame(() => {
        myMesh.current.rotation.y += 0.01
      })
  
      return (
        <mesh ref={myMesh}  scale={[4, 4, 4]} wireframe="true">
          <boxBufferGeometry attach="geometry"  args={[0.90, 0.90, 0.90]} />
          <meshStandardMaterial attach="material"  wireframe={true} color={"#fff"} />
        </mesh>
        
      )
    }

  return (
    <main>
      <h1>Dwayne Paisley-Marshall</h1>

    <Canvas style={{ backgroundColor: "#000000" , height: "100vh", width: "100vw" }}>
    <CameraControls />
    <Box/>
    <Suspense fallback={<Loader />}>
    <ambientLight args={[0xffffff]} intensity={0.97}  />
        <Trainer />
     </Suspense>  
    </Canvas>

      <p>{date ? date : 'Loading date...'}</p>
    </main>
  );
}

export default App;
