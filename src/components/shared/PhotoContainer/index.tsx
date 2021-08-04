import React, { useReducer, useRef } from "react";
import { Icon } from "react-lifesg-design-system";

import styled from "styled-components";

interface ImageProps {
  id: number;
  image: string;
}

type InitialStateProps = ImageProps[];

type Action = { type: "add" };

const initialState: InitialStateProps = [];

const reducer = (state: InitialStateProps, action: any) => {
  return state;
};

const PhotoContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const image1 = useRef<HTMLInputElement>(null);
  if (!state.length) {
    return (
      <Container onClick={() => image1.current?.click()}>
        <PhotoContainers>
          <PhotoContainerIcon type="add-photo" color="blue" />
          <p>Add Photos</p>
          <p>Maximum 3 photos</p>
        </PhotoContainers>
        <input type="file" ref={image1} hidden />
      </Container>
    );
  }
  return <div>test</div>;
};

export default PhotoContainer;

const PhotoContainers = styled.div`
  text-align: center;
`;

const PhotoContainerIcon = styled(Icon)`
  color: blue;
  font-size: 48px;
`;

const Container = styled.div`
  background-image: repeating-linear-gradient(
      -60deg,
      #182fdc,
      #182fdc 5px,
      transparent 5px,
      transparent 11px,
      #182fdc 11px
    ),
    repeating-linear-gradient(
      30deg,
      #182fdc,
      #182fdc 5px,
      transparent 5px,
      transparent 11px,
      #182fdc 11px
    ),
    repeating-linear-gradient(
      120deg,
      #182fdc,
      #182fdc 5px,
      transparent 5px,
      transparent 11px,
      #182fdc 11px
    ),
    repeating-linear-gradient(
      210deg,
      #182fdc,
      #182fdc 5px,
      transparent 5px,
      transparent 11px,
      #182fdc 11px
    );
  background-size: 2px 100%, 100% 2px, 2px 100%, 100% 2px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  height: 200px;
  margin: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
