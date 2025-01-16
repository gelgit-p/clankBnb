import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

  import { ConnectKitButton } from "connectkit";

  function HelloWalletComponent() {

    const buttonStyle = {
      color: "black",
      fontSize: "2rem",
      border: "solid 2px black",
      padding: "2rem",
      fontFamily: "Bebas Neue",
      background: "transparent",
      fontWeight: "500",
      _hover: {
        border: "solid 1px black",
      },
    };

    return (
             //button here 👇🏽
             <ConnectKitButton.Custom>
              {({
                isConnected,
                isConnecting,
                show,
                hide,
                address,
                truncatedAddress,
                ensName,
              }) => {
                return (
                  <Button onClick={show} sx={buttonStyle}>
                    {isConnected ? truncatedAddress : "Connect wallet og"}
                  </Button>
                );
              }}
            </ConnectKitButton.Custom>
    );
  }
  export default HelloWalletComponent;