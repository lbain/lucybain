---
title: 'Intro to Programming: Booleans'
tags: programming, intro-programming
---
## Explaination

As you’ve probably heard, computers think in 1s and 0s. There is no middle ground, there’s no 0.5, no 1.1, no 1 and 0 at the same time. 1 or 0, that’s all they’ve got. It turns out, 1s and 0s are pretty powerful.

Humans have the same concepts as 1s and 0s, we just call them different things - `True` or `False`. For the sake of this post (and all the computers in the world) we will assume something is either entirely `True`, or entirely `False`. There is no middle ground, no maybe, no white lies. Something is either `True` or `False`. Something which is either `True` or `False` is known as a Boolean, after George Boole.

> “The sky is blue” is `True`.

> For me, “I am female” is also `True`, while “I am very tall” is `False`.

In general, computers have no notion of time. There is only the now, no past, no future. A computer doesn’t know what it will be doing in a few minutes (that depends on what you tell it to do, and on what it’s doing now), and it isn’t interested in what it was doing an hour ago. So when computers decide if something is `True` or `False`, they have to decide *at that moment* is the thing `True` or `False`?

“I am very tall” is `False` right now. It’s possible (though unlikely) I’ll have a giant growth spurt and be very tall in the future. That doesn’t matter, we are not interested in what *will* happen, only that I am not very tall *right now*.

“Caramel is my favorite ice cream flavor” is presently `True`. But it might change tomorrow when I try the best chocolate ice cream in the world. Certainly it has changed from my childhood favorite (Rainbow Sherbet). Again, we only focus on my current favorite flavor.

## Exercises

Ok, now it’s your turn. Decide if each of these statements is `True` or `False` for you at the current moment.

- It is sunny outside.
- I am over 5ft tall.
- I am female.
- Chocolate is my favorite ice cream flavor.
- There are five continents.
- The Egyptians built the pyramids.
- I have eaten dinner.
- The light is on.

Think about your every day life, and come up with at least five more examples of when things are `True` or `False`.

<iframe id="hidden_iframe" name="hidden_iframe" style="display:none;">
</iframe>

<form action="https://docs.google.com/forms/d/1u4xIbGktEd3RzHQHfJcSRwuqUklokVcmeNBTrVbH6oI/formResponse" method="POST" id="ss-form" onsubmit="hideQuestions();" target="hidden_iframe" class="programming-examples">
  <div class="example-questions">
    <input type="hidden" name="entry.1043295642" value="Boolean" id="group_1043295642_1" role="radio" class="ss-q-radio valid" aria-label="Boolean">
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