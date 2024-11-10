import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";

import * as THREE from "three";

export const Background = () => {
  return (
    <>
      <Environment files="./hdr/1.exr" background />
      <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
        <LayerMaterial
          lighting="physical"
          transmission={0.01}
          side={THREE.BackSide}
        >
          <Gradient
            colorA={"#357ca1"}
            colorB={"white"}
            axes={"y"}
            start={0}
            end={-0.5}
          />
          {/* <Gradient
            colorA={"#1F1F1F"}
            colorB={"#898989"}
            colorC={"#F2F3F3"}
            axes={"y"}
            start={0}
            end={-0.5}
          /> */}
        </LayerMaterial>
      </Sphere>
    </>
  );
};
