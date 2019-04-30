package org.autotest;

import static org.junit.Assert.*;

import org.junit.Test;

import java.util.Arrays;

public class TestStackAr {
	
	@Test
	public void testDefaultStack()
	{
		StackAr stack = new StackAr();
		assertTrue(stack.size() == 0);
		assertTrue(stack.isEmpty());
		assertTrue(!stack.isFull());
	}
	
	@Test(expected = IllegalArgumentException.class)
	public void testNegativeCapacityStack()
	{
		new StackAr(-1);
	}

	@Test
	public void testPushOneElemStack()
	{
		Object o = new Object();
		StackAr stack = new StackAr();
		stack.push(o);
		assertEquals(stack.size(), 1);
		assertTrue(!stack.isEmpty());
		assertTrue(!stack.isFull());
		assertEquals(stack.top(), o);
	}

	@Test
	public void testPushTwoElemStack()
	{
		StackAr stack = new StackAr();
		stack.push(1);
		stack.push(2);
		assertEquals(stack.size(), 2);
		assertTrue(!stack.isEmpty());
		assertTrue(!stack.isFull());
		assertEquals(stack.top(), 2);
	}

	@Test
	public void testPushAndPullOneElemStack()
	{
		Object o = new Object();
		StackAr stack = new StackAr();
		stack.push(o);
		stack.pop();

		assertTrue(stack.size() == 0);
		assertTrue(stack.isEmpty());
		assertTrue(!stack.isFull());
	}

	@Test
	public void testPopAndTopResultAreTheSame()
	{
		Object o = new Object();
		StackAr stack = new StackAr();
		stack.push(o);

		assertEquals(stack.top(), stack.pop());
	}

	@Test(expected = IllegalStateException.class)
	public void testPushInFull()
	{
		Object o = new Object();
		StackAr stack = new StackAr(0);
		stack.push(o);
	}

	@Test(expected = IllegalStateException.class)
	public void testPopInEmpry()
	{
		StackAr stack = new StackAr();
		stack.pop();
	}

	@Test(expected = IllegalStateException.class)
	public void testTopInEmpry()
	{
		StackAr stack = new StackAr();
		stack.top();
	}

	@Test
	public void testFullStack()
	{
		StackAr stack = new StackAr();
		for(int i = 0; i<10 ;i++)
		{
			stack.push(i);
			assertEquals(stack.top(), i);
		}
		assertTrue(!stack.isEmpty());
		assertTrue(stack.isFull());
	}

	@Test
	public void testFullAndEmpryStack()
	{
		StackAr stack = new StackAr(0);
		assertEquals(stack.size(), 0);
		assertTrue(stack.isFull());
		assertTrue(stack.isEmpty());
	}

	@Test
	public void testStackEqualToItself()
	{
		StackAr stack = new StackAr();
		assertEquals(stack, stack);
	}

	@Test
	public void testStackEqualNull()
	{
		StackAr stack = new StackAr();
		assertNotEquals(stack, null);
	}

	@Test
	public void testStackDiferentClass()
	{
		Object anotherStack = new Object();
		StackAr stack = new StackAr();
		assertNotEquals(stack, anotherStack);
	}

	@Test
	public void testConstructorWithCapacity()
	{
		StackAr stack = new StackAr(1);
		stack.push(1);
		assertTrue(stack.isFull());
	}

	@Test
	public void testStackDiferentCapacity()
	{
		StackAr stack1 = new StackAr(1);
		StackAr stack2 = new StackAr(2);
		assertNotEquals(stack1, stack2);
	}

	@Test
	public void testStackSameCapacityDiferentContent()
	{
		Object o = new Object();
		StackAr stack1 = new StackAr();
		StackAr stack2 = new StackAr();
		stack1.push(o);
		assertNotEquals(stack1, stack2);
		assertEquals(stack1.top(), o);
	}

	@Test
	public void testStackSameCapacityReadIndex()
	{
		Object o = new Object();
		StackAr stack1 = new StackAr();
		StackAr stack2 = new StackAr();
		stack1.push(o);
		stack1.push(o);
		stack1.pop();

		stack2.push(o);
		assertNotEquals(stack1, stack2);
	}

	@Test
	public void testStackEqualsWithSamePush()
	{
		Object o = new Object();
		StackAr stack1 = new StackAr();
		StackAr stack2 = new StackAr();
		stack1.push(o);
		stack2.push(o);
		assertEquals(stack1, stack2);
	}

	@Test
	public void testStackDiferentReadIndex()
	{
		Object o = new Object();
		StackAr stack1 = new StackAr();
		StackAr stack2 = new StackAr();
		stack1.push(o);
		stack1.push(null);
		stack2.push(o);
		assertNotEquals(stack1, stack2);
	}

	@Test
	public void testStackEmpty_HashCode()
	{
		StackAr stack = new StackAr();
		assertEquals(stack.hashCode(), 129083679);
	}

	@Test
	public void testStackOneElem_HashCode()
	{
		StackAr stack = new StackAr();
		stack.push(1);
		assertEquals(stack.hashCode(), -1667867679);
	}

	@Test
	public void testStackEqual_HashCode()
	{
		Object o = new Object();
		StackAr stack1 = new StackAr();
		StackAr stack2 = new StackAr();
		stack1.push(o);
		stack2.push(o);
		assertEquals(stack1.hashCode(), stack2.hashCode());
	}

	@Test
	public void testStacktoStringSimple()
	{
		StackAr stack = new StackAr();
		stack.push(1);
		stack.push(2);
		stack.push(3);
		assertEquals(stack.toString(), "[1,2,3]");
	}

	@Test
	public void testStacktoStringEquals()
	{
		StackAr stack1 = new StackAr();
		StackAr stack2 = new StackAr();
		stack1.push(1);
		stack1.push(2);
		stack2.push(1);
		stack2.push(2);
		assertEquals(stack1.toString(), "[1,2]");
		assertEquals(stack1.toString(), stack2.toString());
	}
}
