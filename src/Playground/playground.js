import React , { Suspense, useRef, useEffect, useState  }  from "react";
import { Canvas,
  useLoader,
  useFrame,
  extend,
  useThree, } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Loader from '../Loader';
import Close from '../Close'  

extend({ OrbitControls });  



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

  const FakeSphereControls = () => {
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
        position={[0.5, -0.7, 4]}
        maxAzimuthAngle={Math.PI / 4}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Math.PI / 4}
        minPolarAngle={0}
      />
    );
  };

  const FakeSphere = () => {
    const [playing, setPlaying] = useState(false);
    const [playing2, setPlaying2] = useState(false);
  
    const [video2] = useState(() => {
      const vid2 = document.createElement("video");
      vid2.src = "https://cdn-static.farfetch-contents.com/Content/UP/EXPERIENCE/Playground/FARFETCH_1.mp4";
      vid2.crossOrigin = "Anonymous";
      vid2.loop = false;
      vid2.autoplay = false;
      vid2.playsInline = true;
      vid2.controls = true;
      return vid2;
    });

    const [video] = useState(() => {
      const vid = document.createElement("video");
      vid.src = "https://cdn-static.farfetch-contents.com/Content/UP/EXPERIENCE/Playground/FARFETCH.mp4";
      vid.crossOrigin = "Anonymous";
      vid.loop = false;
      vid.autoplay = false;
      vid.playsInline = true;
      vid.controls = true;
      return vid;
    });

    
     useEffect(() => {
      console.log("Inside Video 2" );
      if (playing2)
      video2.play()
      else
      video2.pause()

      
    },[playing2 , video2]);
    
    useEffect(() => {
 

      console.log("Inside Video 1" );
      if (playing)
      video.play()
      else
      video.pause()
      
    },[ video,  playing]);
    

   
    useEffect(() => {
      return () => {
        console.log("cleaned up");
      };
    }, []);

    const myMesh = React.useRef()
    // useFrame(() => {// myMesh.current.rotation.y += 0.01})


    return (
      <group>
      <mesh scale={[4, 4, 4]} position={[0,0.5,0]} >
        <sphereBufferGeometry args={[0.7, 30, 30]} attach="geometry" />
        <meshStandardMaterial attach="material" transparent={true}  wireframe={true} color={"#000"} />
      </mesh>
      <mesh ref={myMesh} position={[0.7,0.7,0.7]} scale={[2, 2 ,2]}  onPointerEnter={(e) => setPlaying(true)}  onPointerLeave={(e) => setPlaying(false)}>
        
         <boxBufferGeometry  />
         <meshBasicMaterial>
            <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
      </mesh>
      <mesh ref={myMesh} position={[-1,1,2]} scale={[1, 1 ,1]}  onPointerEnter={(e) => setPlaying2(true)}  onPointerLeave={(e) => setPlaying2(false)}>
      <boxBufferGeometry  />
         <meshBasicMaterial>
            <videoTexture attach="map" args={[video2]} />
        </meshBasicMaterial>
      </mesh>
      </group>
    );
   }

export default function Threedee() { 

    return (
       
    <section >
    <Close />
    <Canvas style={{ backgroundColor: "#000000" , height: "100vh", width: "100vw" }}>
    <CameraControls />
    
  
    <Suspense fallback={<Loader />}>
        <Box/>
        <ambientLight args={[0xffffff]} intensity={0.97}  />
        <Trainer />
     </Suspense>  
    </Canvas>

      <section className="container">
              <section className="project-info">
                  <h3>Problem/Challange</h3>
                  <h4>How might we utlise 3D technologies to highlight the need of sustainability</h4>
              </section>

              <section className="project-info">
                      <h3>Thinking Strategy & Approach</h3>
                      <h4>I decided to dissect a trainer which would reveal the different layers, I dissected the trainer in Blender and exported them as GTLF files.  </h4>
              </section>
          
              <section className="project-info">
                  <h3>Result & Final Experience</h3>
                  <h4>If you pan the camera you'll see the different layers of the trainer, once all the layers are aligned the trainer looks whole. </h4>
              </section>

          </section> 

      <Canvas className="Video-container" pixelRatio={window.devicePixelRatio} style={{ backgroundColor: "#ccc",  height: "120vh", width: "120vw" }}>
      <FakeSphereControls  />
      <Suspense fallback={<Loader />}>
        <FakeSphere />
        </Suspense>
      </Canvas>

      <section className="container">
              <section className="project-info">
                  <h3>Problem/Challange</h3>
                  <h4>How might we utlise 3D technologies to enhance a video viewing experience?</h4>
              </section>

              <section className="project-info">
                      <h3>Thinking Strategy & Approach</h3>
                      <h4>Why should video be static? I decided to take a globe and use it's 360 degree rotation to allow a user to view the video from whichever angle they decide. </h4>
              </section>
          
              <section className="project-info">
                  <h3>Result & Final Experience</h3>
                  <h4>Hover over the boxes to play the video</h4>
              </section>

          </section> 

    </section>
   
    )
}