import {render} from "@testing-library/react";
import ReactShell from "./react-shell";
import {DEFAULT_PROPS, DEFAULT_STRINGS} from "./react-shell.const";

describe('React Shell', () => {
  describe('Initialization', () => {
    describe('Welcome message', () => {
      it('should render user provided message', () => {
        const strings = {
          WELCOME: 'Test Welcome String'
        }
        const component = render(<ReactShell commands={{}} strings={strings} />)
        const el = component.queryByText(strings.WELCOME)
        expect(el).not.toBeNull()
      });

      it('should fallback to default message',  () => {
        const component = render(<ReactShell commands={{}} />)
        const el = component.queryByText(DEFAULT_STRINGS.WELCOME)
        expect(el).not.toBeNull()
      });
    });

    describe('Prompt', () => {
      it('should render a custom prompt', () => {
        const prompt = 'Test Prompt'
        const component = render(<ReactShell commands={{}} prompt={prompt} />)
        const el = component.queryByText(prompt)
        expect(el).not.toBeNull()
      });

      it('should fallback to default prompt',  () => {
        const component = render(<ReactShell commands={{}}  />)
        const el = component.queryByText(DEFAULT_PROPS.prompt.trim())
        expect(el).not.toBeNull()
      });
    });
  });
});
