import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ValenceProvider } from "../../..";
import { Space as S } from "./Space";
import { Flex, StyledFlex } from "../Flex";
import { Text } from "../../display";

const meta: Meta<typeof S> = {
  component: S,
  title: "Valence/Layout",
  argTypes: {
    height: { control: { type: "text" } },
    width: { control: { type: "text" } },
    grow: { control: { type: "boolean" } },
  },
};
export default meta;
type Story = StoryObj<typeof S>;

export const Space: Story = (args: any) => (
  <ValenceProvider>
    <Flex direction="column">
      <StyledFlex
        grow
        align="center"
        justify="center"
        height={100}
        color="black"
      >
        <Text>1</Text>
      </StyledFlex>
      <S data-testId="InputField-id" {...args} />
      <StyledFlex
        grow
        align="center"
        justify="center"
        height={100}
        color="black"
      >
        <Text>2</Text>
      </StyledFlex>
      <StyledFlex
        grow
        align="center"
        justify="center"
        height={100}
        color="black"
      >
        <Text>3</Text>
      </StyledFlex>
    </Flex>

  </ValenceProvider>
);
Space.args = {
  height: "100px",
  grow: false,
};