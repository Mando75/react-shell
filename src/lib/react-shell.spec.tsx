import {
  findByText,
  fireEvent,
  queryByText,
  render,
  RenderResult,
} from "@testing-library/react";
import ReactShell, { ICommands, IReactShellProps } from "./react-shell";
import { DEFAULT_PROPS, DEFAULT_STRINGS } from "./react-shell.const";

describe("React Shell", () => {
  let component: RenderResult;

  function renderComponent(
    props: Partial<IReactShellProps> = { commands: {} }
  ) {
    const mergedProps = { commands: {}, ...props };
    component = render(<ReactShell {...mergedProps} />);
    return component;
  }

  function submitInput(message: string) {
    const input = component.getByRole("textbox");
    fireEvent.change(input, {
      target: { innerText: message },
    });
    fireEvent.keyDown(input, { key: "Enter" });
  }

  async function waitForCommand(
    command: string,
    prompt = DEFAULT_PROPS.prompt
  ) {
    const buffer = await component.findByTestId("buffer-wrapper");
    return findByText(buffer, prompt + command);
  }

  describe("Initialization", () => {
    describe("Welcome message", () => {
      it("should render user provided message", () => {
        const strings = {
          WELCOME: "Test Welcome String",
        };
        renderComponent({ strings });
        const el = component.queryByText(strings.WELCOME);
        expect(el).not.toBeNull();
      });

      it("should fallback to default message", () => {
        renderComponent();
        const el = component.queryByText(DEFAULT_STRINGS.WELCOME);
        expect(el).not.toBeNull();
      });
    });

    describe("Prompt", () => {
      it("should render a custom prompt", () => {
        const prompt = "Test Prompt";
        renderComponent({ prompt });
        const el = component.queryByText(prompt);
        expect(el).not.toBeNull();
      });

      it("should fallback to default prompt", () => {
        renderComponent();
        const el = component.queryByText(DEFAULT_PROPS.prompt.trim());
        expect(el).not.toBeNull();
      });
    });
  });

  describe("Executing Commands", () => {
    describe("Invalid Commands", () => {
      it("should display a custom invalid command message", async () => {
        const strings = {
          INVALID_COMMAND: "Test Invalid Command Message",
        };
        renderComponent({ strings });
        submitInput("invalid-command");
        await component.findByText(strings.INVALID_COMMAND);
      });

      it("should display the default invalid command message", async () => {
        renderComponent();
        submitInput("invalid-command");
        await component.findByText(DEFAULT_STRINGS.INVALID_COMMAND);
      });
    });

    describe("Basic commands", () => {
      it("should invoke the correct command", async () => {
        const commands: ICommands = {
          foo: jest.fn(),
          bar: jest.fn(),
        };
        renderComponent({ commands });
        submitInput("foo");
        await waitForCommand("foo");
        expect(commands.foo).toHaveBeenCalled();
        expect(commands.bar).not.toHaveBeenCalled();
      });

      it("should pass the arguments and buffer options to the command", async () => {
        const commands: ICommands = {
          foo: jest.fn(),
        };
        renderComponent({ commands });
        const input = ["foo", "with", "test", "args"];
        submitInput(input.join(" "));
        await waitForCommand(input.join(" "));
        expect(commands.foo).toHaveBeenCalledWith(
          input,
          expect.objectContaining({
            clear: expect.any(Function),
            buffer: expect.any(Array),
            append: expect.any(Function),
          })
        );
      });
    });

    describe("Error Handling", () => {
      it("should render custom error message", async () => {
        const strings = {
          ERROR_PREFACE: "Test Error Preface",
        };
        const commands: ICommands = {
          foo: jest.fn().mockRejectedValue("Test Error"),
        };
        renderComponent({ commands, strings });
        submitInput("foo");
        await waitForCommand("foo");
        const buffer = component.getByTestId("buffer-wrapper");
        expect(queryByText(buffer, strings.ERROR_PREFACE)).not.toBeNull();
      });

      it("should render default error message", async () => {
        const commands: ICommands = {
          foo: jest.fn().mockRejectedValue("Test Error"),
        };
        renderComponent({ commands });
        submitInput("foo");
        await waitForCommand("foo");
        const buffer = component.getByTestId("buffer-wrapper");
        expect(
          queryByText(buffer, DEFAULT_STRINGS.ERROR_PREFACE)
        ).not.toBeNull();
      });

      it("should append the error message", async () => {
        const commands: ICommands = {
          foo: jest.fn().mockRejectedValue(new Error("Test Error Rejection")),
        };
        renderComponent({ commands });
        submitInput("foo");
        await waitForCommand("foo");
        const buffer = component.getByTestId("buffer-wrapper");
        expect(queryByText(buffer, "Test Error Rejection")).not.toBeNull();
      });
    });
  });
});
