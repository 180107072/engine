The core is partitioned into the following layers:

    base: Provides general utilities and user interface building blocks that can be used in any other layer.
    platform: Defines service injection support and the base services for VS Code that are shared across layers such as workbench and code. Should not include editor or workbench specific services or code.
    editor: The "Monaco" editor is available as a separate downloadable component.
    workbench: Hosts the "Monaco" editor, notebooks and custom editors and provides the framework for panels like the Explorer, Status Bar, or Menu Bar, leveraging Electron to implement the VS Code desktop application and browser APIs to provide VS Code for the Web.
    code: The entry point to the desktop app that stitches everything together, this includes the Electron main file, shared process, and the CLI for example.
    server: The entry point to our server app for remote development.
