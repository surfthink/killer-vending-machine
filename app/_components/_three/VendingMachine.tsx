import { useAnimations, useGLTF } from "@react-three/drei";
import React, { Ref, forwardRef } from "react";
import { Group, LoopOnce, Object3DEventMap } from "three";

interface VendingMachineProps {
  position?: [number, number, number];
  scale: number;
  onClick?: (e: any) => void;
}

enum PIVOT {
  FRONT,
  BACK,
}

const VENDING_MACHINE_WIDTH = 3.6;

export const VendingMachine = forwardRef(
  ({ scale,onClick, position = [0, 0, 0] }: VendingMachineProps, ref) => {
    const vendingMachine = useGLTF("./vending-machine.glb");
    const { actions, names } = useAnimations(
      vendingMachine.animations,
      vendingMachine.scene,
    );


    const eventHandler = (e: any) => {
      console.log(e.object.name);
      if (e.object.name !== "top_buttonpressable") return;
      console.log(names, actions);
      if (actions && names) {
        const action = actions[names[0]];
        console.log(action);
        if (action) {
          console.log("Playing animation");
          action.setLoop(LoopOnce, 1).reset().play();
        }
      }
    };

    return (
      <group
        ref={ref as Ref<Group<Object3DEventMap>>}
        scale={scale}
      >
        <mesh position={[0, 0,0]}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color="orange" wireframe={true} />
        </mesh>
        <primitive
          object={vendingMachine.scene}
          onClick={onClick}
        />
      </group>
    );
  },
);