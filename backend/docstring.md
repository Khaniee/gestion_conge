# This is a sample of docstring with Google-Style

## Module

```python
"""This module provides utility functions for processing data.

The functions in this module can be used to clean, transform, and analyze data. The module also includes some utilityfunctions for working with lists and strings.

Examples:
    >>> import data_processing
    >>> data = [1, 2, 3, 4, 5]
    >>> data_processing.sum_data(data)
    15
    >>> data_processing.average_data(data)
    3.0
```

## Variable

```python
from typing import List

DEFAULT_VALUE: List[int] = [1, 2, 3, 4, 5]
"""List[int]: A list of default values for some configuration parameters."""
```


## Generator

```python
def example_generator(n):
    """Generators have a ``Yields`` section instead of a ``Returns`` section.

    Args:
        n (int): The upper limit of the range to generate, from 0 to `n` - 1.

    Yields:
        int: The next number in the range of 0 to `n` - 1.

    Examples:
        Examples should be written in doctest format, and should illustrate how
        to use the function.

        >>> print([i for i in example_generator(4)])
        [0, 1, 2, 3]

    """
    for i in range(n):
        yield i
```

## Function (Parameters, Returns, Exceptions)
```python
def divide(dividend: float, divisor: float) -> float:
    """Divide two numbers.

    Args:
        dividend (float): The number to be divided.
        divisor (float): The number to divide by.

    Returns:
        float: The result of dividing `dividend` by `divisor`.

    Raises:
        ZeroDivisionError: If `divisor is zero`.
    """
    ...
```

```python
def repeat_string(string: str, times: int = 1) -> str:
    """Repeat a string a specified number of times.

    Args:
        string (str): The string to repeat.
        times (int, optional): The number of times to repeat the string. Defaults to 1.

    Returns:
        str: The repeated string.

    Raises:
        ValueError: If `times` is less than 1.

    Examples:
        >>> repeat_string("hello", 3)
        'hellohellohello'
        >>> repeat_string("world", 4)
        'worldworldworldworld'
    """
    ...
```

```python
from typing import List

def process_data(data: List[str]) -> None:
    """Process a list of data.

    Args:
        data (List[str]): The list of data to process.

    Returns:
        None
    """
    ...
```

```python
def repeat_string(s: str, n: int) -> str:
    """Return a string that consists of `s` repeated `n` times.

    Args:
        s (str): The string to be repeated.
        n (int): The number of times to repeat the string.

    Returns:
        str: The repeated string.

    Raises:
        ValueError: If `n` is less than 1.

    Examples:
        >>> repeat_string("hello", 3)
        'hellohellohello'
        >>> repeat_string("world", 4)
        'worldworldworldworld'
    """
    if n < 1:
        raise ValueError("n must be at least 1")
    return s * n
```

```python
from typing import Union

def get_object(object_id: int) -> Union[str, float]:
    """Get an object with a specified ID.

    Args:
        object_id (int): The ID of the object to retrieve.

    Returns:
        Union[str, float]: The object with the specified ID, as a string or a float.

    Raises:
        KeyError: If the object is not found.
    """
    ...
```

## Class

```python
class Point:
    """A class that represents a point in 2D space.

    Attributes:
        x (float): The x-coordinate of the point.
        y (float): The y-coordinate of the point.

    Methods:
        distance_from_origin (): Returns the distance of the point from the origin.
        translate (dx: float, dy: float): Translates the point by (dx, dy).
    """

    def __init__(self, x: float, y: float):
        """Initializes a new instance of the Point class.

        Args:
            x (float): The x-coordinate of the point.
            y (float): The y-coordinate of the point.
        """
        self.x = x
        self.y = y

    def distance_from_origin(self) -> float:
        """Returns the distance of the point from the origin.

        Returns:
            float: The distance of the point from the origin.
        """
        return ((self.x ** 2) + (self.y ** 2)) ** 0.5

    def translate(self, dx: float, dy: float):
        """Translates the point by (dx, dy).

        Args:
            dx (float): The amount to translate the x-coordinate.
            dy (float): The amount to translate the y-coordinate.
        """
        self.x += dx
        self.y += dy
```

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    """An abstract base class that represents a shape.

    Attributes:
        color (str): The color of the shape.

    Methods:
        area (): Returns the area of the shape.
    """

    def __init__(self, color: str):
        """Initializes a new instance of the Shape class.

        Args:
            color (str): The color of the shape.
        """
        self.color = color

    @abstractmethod
    def area(self) -> float:
        """Returns the area of the shape.

        Returns:
            float: The area of the shape.
        """
        pass

class Rectangle(Shape):
    """A class that represents a rectangle.

    Attributes:
        width (float): The width of the rectangle.
        height (float): The height of the rectangle.
    """

    def __init__(self, color: str, width: float, height: float):
        """Initializes a new instance of the Rectangle class.

        Args:
            color (str): The color of the rectangle.
            width (float): The width of the rectangle.
            height (float): The height of the rectangle.
        """
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self) -> float:
        """Returns the area of the rectangle.

        Returns:
            float: The area of the rectangle.
        """
        return self.width * self.height
```

```python
class Circle:
    """A class that represents a circle.

    Attributes:
        pi (float): The value of pi.
        radius (float): The radius of the circle.
    """

    pi = 3.141592653589793

    def __init__(self, radius: float):
        """Initializes a new instance of the Circle class.

        Args:
            radius (float): The radius of the circle.
        """
        self.radius = radius

    def area(self) -> float:
        """Returns the area of the circle.

        Returns:
            float: The area of the circle.
        """
        return Circle.pi * self.radius ** 2

    @classmethod
    def from_diameter(cls, diameter: float):
        """Creates a new instance of the Circle class from its diameter.

        Args:
            diameter (float): The diameter of the circle.

        Returns:
            Circle: A new instance of the Circle class.
        """
        return cls(diameter / 2)
```

## example_google.py

```python
# -*- coding: utf-8 -*-
"""Example Google style docstrings.

This module demonstrates documentation as specified by the `Google Python
Style Guide`_. Docstrings may extend over multiple lines. Sections are created
with a section header and a colon followed by a block of indented text.

Example:
    Examples can be given using either the ``Example`` or ``Examples``
    sections. Sections support any reStructuredText formatting, including
    literal blocks::

        $ python example_google.py

Section breaks are created by resuming unindented text. Section breaks
are also implicitly created anytime a new section starts.

Attributes:
    module_level_variable1 (int): Module level variables may be documented in
        either the ``Attributes`` section of the module docstring, or in an
        inline docstring immediately following the variable.

        Either form is acceptable, but the two should not be mixed. Choose
        one convention to document module level variables and be consistent
        with it.

Todo:
    * For module TODOs
    * You have to also use ``sphinx.ext.todo`` extension

.. _Google Python Style Guide:
   http://google.github.io/styleguide/pyguide.html

"""

module_level_variable1 = 12345

module_level_variable2 = 98765
"""int: Module level variable documented inline.

The docstring may span multiple lines. The type may optionally be specified
on the first line, separated by a colon.
"""


def function_with_types_in_docstring(param1, param2):
    """Example function with types documented in the docstring.

    `PEP 484`_ type annotations are supported. If attribute, parameter, and
    return types are annotated according to `PEP 484`_, they do not need to be
    included in the docstring:

    Args:
        param1 (int): The first parameter.
        param2 (str): The second parameter.

    Returns:
        bool: The return value. True for success, False otherwise.

    .. _PEP 484:
        https://www.python.org/dev/peps/pep-0484/

    """


def function_with_pep484_type_annotations(param1: int, param2: str) -> bool:
    """Example function with PEP 484 type annotations.

    Args:
        param1: The first parameter.
        param2: The second parameter.

    Returns:
        The return value. True for success, False otherwise.

    """


def module_level_function(param1, param2=None, *args, **kwargs):
    """This is an example of a module level function.

    Function parameters should be documented in the ``Args`` section. The name
    of each parameter is required. The type and description of each parameter
    is optional, but should be included if not obvious.

    If \*args or \*\*kwargs are accepted,
    they should be listed as ``*args`` and ``**kwargs``.

    The format for a parameter is::

        name (type): description
            The description may span multiple lines. Following
            lines should be indented. The "(type)" is optional.

            Multiple paragraphs are supported in parameter
            descriptions.

    Args:
        param1 (int): The first parameter.
        param2 (:obj:`str`, optional): The second parameter. Defaults to None.
            Second line of description should be indented.
        *args: Variable length argument list.
        **kwargs: Arbitrary keyword arguments.

    Returns:
        bool: True if successful, False otherwise.

        The return type is optional and may be specified at the beginning of
        the ``Returns`` section followed by a colon.

        The ``Returns`` section may span multiple lines and paragraphs.
        Following lines should be indented to match the first line.

        The ``Returns`` section supports any reStructuredText formatting,
        including literal blocks::

            {
                'param1': param1,
                'param2': param2
            }

    Raises:
        AttributeError: The ``Raises`` section is a list of all exceptions
            that are relevant to the interface.
        ValueError: If `param2` is equal to `param1`.

    """
    if param1 == param2:
        raise ValueError('param1 may not be equal to param2')
    return True


def example_generator(n):
    """Generators have a ``Yields`` section instead of a ``Returns`` section.

    Args:
        n (int): The upper limit of the range to generate, from 0 to `n` - 1.

    Yields:
        int: The next number in the range of 0 to `n` - 1.

    Examples:
        Examples should be written in doctest format, and should illustrate how
        to use the function.

        >>> print([i for i in example_generator(4)])
        [0, 1, 2, 3]

    """
    for i in range(n):
        yield i


class ExampleError(Exception):
    """Exceptions are documented in the same way as classes.

    The __init__ method may be documented in either the class level
    docstring, or as a docstring on the __init__ method itself.

    Either form is acceptable, but the two should not be mixed. Choose one
    convention to document the __init__ method and be consistent with it.

    Note:
        Do not include the `self` parameter in the ``Args`` section.

    Args:
        msg (str): Human readable string describing the exception.
        code (:obj:`int`, optional): Error code.

    Attributes:
        msg (str): Human readable string describing the exception.
        code (int): Exception error code.

    """

    def __init__(self, msg, code):
        self.msg = msg
        self.code = code


class ExampleClass(object):
    """The summary line for a class docstring should fit on one line.

    If the class has public attributes, they may be documented here
    in an ``Attributes`` section and follow the same formatting as a
    function's ``Args`` section. Alternatively, attributes may be documented
    inline with the attribute's declaration (see __init__ method below).

    Properties created with the ``@property`` decorator should be documented
    in the property's getter method.

    Attributes:
        attr1 (str): Description of `attr1`.
        attr2 (:obj:`int`, optional): Description of `attr2`.

    """

    def __init__(self, param1, param2, param3):
        """Example of docstring on the __init__ method.

        The __init__ method may be documented in either the class level
        docstring, or as a docstring on the __init__ method itself.

        Either form is acceptable, but the two should not be mixed. Choose one
        convention to document the __init__ method and be consistent with it.

        Note:
            Do not include the `self` parameter in the ``Args`` section.

        Args:
            param1 (str): Description of `param1`.
            param2 (:obj:`int`, optional): Description of `param2`. Multiple
                lines are supported.
            param3 (:obj:`list` of :obj:`str`): Description of `param3`.

        """
        self.attr1 = param1
        self.attr2 = param2
        self.attr3 = param3  #: Doc comment *inline* with attribute

        #: list of str: Doc comment *before* attribute, with type specified
        self.attr4 = ['attr4']

        self.attr5 = None
        """str: Docstring *after* attribute, with type specified."""

    @property
    def readonly_property(self):
        """str: Properties should be documented in their getter method."""
        return 'readonly_property'

    @property
    def readwrite_property(self):
        """:obj:`list` of :obj:`str`: Properties with both a getter and setter
        should only be documented in their getter method.

        If the setter method contains notable behavior, it should be
        mentioned here.
        """
        return ['readwrite_property']

    @readwrite_property.setter
    def readwrite_property(self, value):
        value

    def example_method(self, param1, param2):
        """Class methods are similar to regular functions.

        Note:
            Do not include the `self` parameter in the ``Args`` section.

        Args:
            param1: The first parameter.
            param2: The second parameter.

        Returns:
            True if successful, False otherwise.

        """
        return True

    def __special__(self):
        """By default special members with docstrings are not included.

        Special members are any methods or attributes that start with and
        end with a double underscore. Any special member with a docstring
        will be included in the output, if
        ``napoleon_include_special_with_doc`` is set to True.

        This behavior can be enabled by changing the following setting in
        Sphinx's conf.py::

            napoleon_include_special_with_doc = True

        """
        pass

    def __special_without_docstring__(self):
        pass

    def _private(self):
        """By default private members are not included.

        Private members are any methods or attributes that start with an
        underscore and are *not* special. By default they are not included
        in the output.

        This behavior can be changed such that private members *are* included
        by changing the following setting in Sphinx's conf.py::

            napoleon_include_private_with_doc = True

        """
        pass

    def _private_without_docstring(self):
        pass
```
