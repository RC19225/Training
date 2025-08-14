// See https://aka.ms/new-console-template for more information
using System;

public class Program
{
    private int x; // Encapsulated field
    
    public int Y => x + 10;
    
    public void SetX(int value) => x = value;
    
    public bool IsValid()
    {
        return Y > 18;
    }
    
    public void Increment18()
    {
        if (IsValid())
            x++;
        else
            throw new Exception("Invalid operation");
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
    }
}
