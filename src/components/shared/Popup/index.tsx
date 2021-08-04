import { useState } from "react";
import { Modal, Button } from "react-lifesg-design-system";
import {
  Container,
  Text,
  FooterText,
  AppButton,
  ButtonWrapper,
} from "./styled";
import parse from "html-react-parser";

interface PopupProps {
  header?: string;
  subHeader?: string;
  content?: string;
  footer?: string;
  buttons?: [ButtonProps, ButtonProps?];
}

interface ButtonProps {
  styleType?: "default" | "ghost" | "outlined";
  title: string;
  onClick?: () => void;
}

const Popup = ({
  header,
  subHeader,
  content,
  footer,
  buttons,
}: PopupProps): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(true);

  const onClickHandler = () => {
    setShowModal((currentState) => !currentState);
  };
  return (
    <div>
      <Modal.Base
        show={showModal}
        animationFrom="bottom"
        enableOverlayClick={true}
        onOverlayClick={onClickHandler}
      >
        <Modal.Box onClose={onClickHandler}>
          <Container>
            {header && <Text>{parse(header)}</Text>}
            {subHeader && <Text>{parse(subHeader)}</Text>}
            {content && <Text>{parse(content)}</Text>}
            {footer && <FooterText>{parse(footer)}</FooterText>}
            <ButtonWrapper>
              {buttons &&
                buttons.map(
                  (button) =>
                    button && (
                      <AppButton
                        key={button.title}
                        styleType={button.styleType || "default"}
                        onClick={button.onClick}
                      >
                        {button.title}
                      </AppButton>
                    )
                )}
            </ButtonWrapper>
          </Container>
        </Modal.Box>
      </Modal.Base>
    </div>
  );
};

export default Popup;
