1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans to the qus no: 01
getElementById(): getElementById() Selects and returns a single element with a specific id attribute.
getElementsByClassName(): getElementsByClassName() Selects elements and returns an HTMLCollection (multiple elements) that have the same class name.  
querySelector(): querySelector() Selects and returns the first element that matches a specified CSS selector.
querySelectorAll(): querySelectorAll() Selects all elements and Returns a NodeList (multiple elements) that match a CSS selector.

2. How do you create and insert a new element into the DOM?
Ans to the qus no: 02
We use createElement() to create a new element.
Then we use appendChild() or append() to insert the element into the page (DOM).

3. What is Event Bubbling? And how does it work?
Ans to the qus no: 03
Event Bubbling is when an event happens on a child element and then moves up to its parent elements in the DOM.
Event Bubbling works in JavaScript like this: The event first runs on the target element. Then it moves up to its parent element. After that, it moves to the parent’s parent (element.parentNode). It continues until it reaches the document. 

4. What is Event Delegation in JavaScript? Why is it useful?
Ans to the qus no: 04
Event Delegation is a way to handle events of child elements by adding a single event listener to the parent element instead of adding event listeners to multiple child elements.
Event Delegation is useful because it improves performance (by reducing multiple event listeners), works for dynamically added elements, and makes the code cleaner and easier to manage.

5. What is the difference between preventDefault() and stopPropagation() methods?
Ans to qus no: 05
preventDefault(): The preventDefault() method prevents the browser from executing the default behavior of an element. For example, it can stop a form from submitting or a link from opening.
stopPropagation(): The stopPropagation() method prevents the event from bubbling up to parent elements. For example, clicking a child element normally triggers parent events too, but stopPropagation() stops the event from reaching the parent.