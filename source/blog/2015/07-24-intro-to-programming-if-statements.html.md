---
title: 'Intro to programming: If statements'
tags: ["programming", "intro-programming"]

description: A very basic level description of if statements.
keywords: introduction, programming, if statements
---

## Explanation

Although computers live in a very predictable world of 1s and 0s they need to be able to handle uncertainties.

> **If** a customer has enough money in his account **then** the ATM should give money out.

> **If** a shirt is on sale **then** the shirt’s price must be updated 

You deal with uncertainties by using the same kind of **if statements** as a computer every day.

> **If** it is sunny **then** we will have a picnic.

You first determine that it’s sunny, then you know you will have a picnic.

> **If** you are over 4ft tall **then** you can ride this roller coaster.

Once you know you know you are over 4ft tall you also know you are allowed to ride this roller coaster.

Each if statement will occur only under a certain condition (it’s sunny or you are over 4ft tall in the above examples). This condition will be a `True` or `False` statement. When the condition is `True`, the “then” section will occur. When the condition is `False`, the “then” section is ignored.

We might string many of these ifs together:

> * **If** it is sunny **then** we will have a picnic.
> * **If** it is raining **then** I will bring an umbrella.
> * **If** it is cold **then** I will wear a coat.

Let’s assume that it’s both sunny and cold. Using your “human” brain, reread the above.

> * Will you go on a picnic? Yes.
> * Will you bring an umbrella? No.
> * Will you wear a coat? Yes.

Lovely! You've got a picnic wearing a light jacket to look forward to!

Now look at the conditions in the examples above with your “computer” brain. Notice anything? These conditions are always a statement that is `True` or `False`. “It is sunny”, “it is raining”, and “it is cold” are all boolean expressions. So the computer can read these examples as:

> * **If** `True` **then** we will have a picnic.
> * **If** `False` (this is ignored since the condition evaluated to `False`)
> * **If** `True` **then** I will wear a coat.

Computers use these if statements to determine what should happen next. If statements control the flow of the program, some things happen (like having a picnic), while others are skipped over (like bringing an umbrella).

## Exercises

Ok, now it’s your turn. Answer the following questions for you at the current moment.

* **If** it is sunny **then** we will have a picnic.

    Will you have a picnic today?

* **If** you eat your vegetables **then** you can have dessert.

    Any dessert for you?

* **If** the sky is blue **then** the world is turning.

    Is the world still turning?

* **If** the light is off **then** the teacher will turn it on.

    Does the teacher turn on the light?


Think about your every day life, and come up with at least five more examples of when you use if statements to decide what to do.

<iframe id="hidden_iframe" name="hidden_iframe" style="display:none;">
</iframe>

<form action="https://docs.google.com/forms/d/1u4xIbGktEd3RzHQHfJcSRwuqUklokVcmeNBTrVbH6oI/formResponse" method="POST" id="ss-form" onsubmit="hideQuestions();" target="hidden_iframe" class="programming-examples">
  <div class="example-questions">
    <input type="hidden" name="entry.1043295642" value="If statements" id="group_1043295642_1" role="radio" class="ss-q-radio valid" aria-label="Boolean">
    <ol>
      <li>
        <textarea name="entry.1571729994" rows="8" cols="0" class="ss-q-long" id="entry_1571729994" dir="auto" aria-label="Example 1  "></textarea>
      </li>
      <li>
        <textarea name="entry.332234193" rows="8" cols="0" class="ss-q-long" id="entry_332234193" dir="auto" aria-label="Example 2  "></textarea>
      </li>
      <li>
        <textarea name="entry.796117189" rows="8" cols="0" class="ss-q-long" id="entry_796117189" dir="auto" aria-label="Example 3  "></textarea>
      </li>
      <li>
        <textarea name="entry.1635444679" rows="8" cols="0" class="ss-q-long" id="entry_1635444679" dir="auto" aria-label="Example 4  "></textarea>
      </li>
      <li>
        <textarea name="entry.341236292" rows="8" cols="0" class="ss-q-long" id="entry_341236292" dir="auto" aria-label="Example 5  "></textarea>
      </li>
    </ol>
    <input type="submit" name="submit" value="Submit" id="ss-submit" class="jfk-button jfk-button-action ">
  </div>
  <div class="thank-you">
    Thanks for submitting your examples!
  </div>
</form>

<script>
function hideQuestions() {
  document.getElementsByClassName('example-questions')[0].className+=' inactive';
  document.getElementsByClassName('thank-you')[0].className+=' active';
}
</script>