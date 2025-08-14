using System;
using Xunit;
namespace UnitTests
{
    public class UnitTest1
    {
        private readonly Program _program = new Program();

        [Fact]
        public void Given_Program_Instance_When_SettingX_Then_YShouldBeCorrect()
        {
            // Arrange
            int expectedValue = 20; // x = 10, Y = x + 10

            // Act
            _program.SetX(10);
            int actualValue = _program.Y;

            // Assert
            Assert.Equal(expectedValue, actualValue);
        }

        [Fact]
        public void Given_Program_Instance_When_IsValid_Then_ReturnsTrue()
        {
            // Arrange
            _program.SetX(10); // Y = 10 + 10 = 20

            // Act
            var result = _program.IsValid();

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Given_Program_Instance_When_IsValid_Then_ReturnsFalse()
        {
            // Arrange
            _program.SetX(5); // Y = 5 + 10 = 15

            // Act
            var result = _program.IsValid();

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void Given_Program_Instance_When_Increment18_Then_YShouldBeIncremented()
        {
            // Arrange
            _program.SetX(10); // Y = 10 + 10 = 20

            // Act
            _program.Increment18();

            // Assert
            Assert.Equal(21, _program.Y); // After increment, x = 11, Y = 11 + 10 = 21
        }

        [Fact]
        public void Given_Program_Instance_When_Increment18_And_IsNotValid_Then_ExceptionShouldBeThrown()
        {
            // Arrange
            _program.SetX(5); // Y = 5 + 10 = 15

            // Act & Assert
            var exception = Assert.Throws<Exception>(() => _program.Increment18());
            Assert.Equal("Invalid operation", exception.Message);
        }
    }
}