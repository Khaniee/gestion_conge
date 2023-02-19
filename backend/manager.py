#! /usr/bin/env python
"""
Manager for fastapi application
"""

__major_version__ = 1
__minor_version__ = 0
__version__ = f"{__major_version__}.{__minor_version__}"

import platform

import click
import uvicorn


class ArgumentCommandNotRecognized(Exception):
    """Argument Command is not recognized"""


RUN_COMMAND = "runserver"
HELP_COMMAND = "help"


def display_version(ctx: click.Context, param: click.Parameter, value: bool):
    """Display help message"""
    if not value:
        return
    gestion_conge_version = """Running Gestion Conge %s with %s %s on %s"""
    click.echo(
        gestion_conge_version
        % (
            __version__,
            platform.python_implementation(),
            platform.python_version(),
            platform.system(),
        )
    )
    ctx.exit()


@click.command()
@click.option(
    "--version",
    is_flag=True,
    callback=display_version,
    help="Display Gestion Conge version and exit.",
)
@click.option("--host", default="127.0.0.1", help="The hostname to listen on.")
@click.option("--port", default=8000, help="The port to listen on.")
@click.argument("command", type=click.STRING)
def main(  # pylint: disable=missing-function-docstring
    version,  # pylint: disable=unused-argument
    host,
    port,
    command,
):
    try:
        if command == RUN_COMMAND:
            return launch_uvicorn_app(host=host, port=port)
        raise ArgumentCommandNotRecognized(command)
    except ArgumentCommandNotRecognized as err:
        click.echo(get_not_recognized_argument_message("command", err))


def get_not_recognized_argument_message(arg_key, provided_arg):
    """Get an descriptive error message for not recognized argument"""
    return (
        f"The following '{provided_arg}' has not"
        f"been recognized as valid '{arg_key}'."
    )


def launch_uvicorn_app(host, port):
    """Launch uvicorn app"""
    uvicorn.run("main:app", host=host, port=port, reload=True)


if __name__ == "__main__":
    main()  # pylint: disable=no-value-for-parameter
