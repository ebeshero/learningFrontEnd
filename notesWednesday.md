# Day 3 – Doing Everything With Style!
### Some random stuff:
React native is for building cell phone apps.

Helpful resource on Ramda functions: "What Ramda function should I use?"
<https://github.com/ramda/ramda/wiki/What-Function-Should-I-Use>

Solutions to Day 2 Exercises are on Andrew's Gist: <https://gist.github.com/oncomouse> 

Discussion of use states:

typically 2 variables, the original, and the newly altered
const [words, setWords] = useState('');
but, hypothetically, we can also use spread to get even more values:

const [words, setWords, ...otherArrayElements] = useState('');
this destructures the array into useful pieces to call. 

Like this:
```
const update = (key, value, object) => ({...object, [key]: value})

update('foo', 'bar', {name: 'Andrew'}) 
// This yields: ({name:Andrew, foo:bar}) with a new key value pair. Notice you need the square brackets to ensure key becomes a real key.

update('foo', 'bar', {foo: 'Andrew'})
//yields ({foo:bar, foo:Andrew}
 ```

Object concatenation using spread notation:

configuration = {
 age:34
}
defaultConfiguration = {
 age:0
 name: 'person',
 height: 56
}

newConfiguration = { ...defaultConfiguration, ...configuration} 
//This appends one to the other, basically concatenates. If you don't spread out ...configuration, it'll get nested inside defaultConfiguration


As we will talk about numerous times today, CSS (Cascading StyleSheets) is a great technology for styling websites in a structured and logical manner. It was an important web technology when it was developed because it decoupled design from content: HTML was, as it was always intended, a language for describing what the elements of a website were semantically ("this is a heading level 1, this is a paragraph, here's a table!") while CSS told the browser how the designer wanted these individual document elements to appear.

However, one problem that crops up a lot when you dive into contemporary web development is how little the developers of many of these web technologies thought that the Internet would ever be a serious application platform. CSS is especially notable for these sorts of problems (though JavaScript has signs that [it was developed from scratch by one person in 10 days](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/)). Particularly, as we will see today:

1. Everything is stored in a global namespace
1. CSS Parser is inefficient on long selectors
1. There are no variables and no control structures
1. Because of #3, there is no way to patch old versions of CSS (a la JavaScript)

We'll be looking first at strategies for writing CSS that address #1 and #2 before looking at technologies that use pre-processors to address #3 and #4.

The big thing we'll be learning today is that CSS lets you build very complex designs quickly and easily but without investigating in best practices in advance, large CSS projects can quickly get out of control. CSS, even more than JavaScript and React, is a technology where you will probably want to invest (time and energy, not money) in a scheme to manage your code. While all of the things we will be talking about today have downsides (in terms of complexity, additional project size, or learning a new paradigm), the alternative is to have CSS that is difficult to manage in the long term.

## Some Suggested CSS Rules

Source: [https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06)

1. Classes and IDs are lower-cased words separated by hyphens.
1. CSS Rules should be each on a new line, separated by commas.
1. CSS Selectors should be separated by 1 blank line.
1. All CSS Rules should have two elements; if not, refactor.

## Managing CSS Components: BEM Rules

BEM stands for **B**lock, **E**lement, **M**odifier. It is a hierarchical, logical, and predictable way to name classes in CSS.

* **Blocks** are conceptual components on a page, such as `header`, `card`, or `navbar`.
	* Blocks are named in lowercase, with hyphens between words.
* **Elements** are smaller items contained in a Block, such as `header__title`, `card__image`, or `navbar__widget`.
	* Elements are named in lowercase, with the name of their parent block followed by two underscores, followed by the name of the element (which is in lowercase with hyphens between words).
* **Modifiers** represent special states applied to Blocks or Elements, such as `button--warning` or `navbar__widget--night-mode`.
	* Modifiers are applied in addition to the regular Block or Element identifier.
	* Modifiers are the name of the Block or Element followed by two hyphens, followed by the name of the modifier (which is, like everything else, written in lowercase with hyphens between words)

A couple of other rules for BEM:

* No element literals or IDs used in CSS; *everything* is addressed with classes.
	* This allows for reusability of CSS in case the underlying HTML has to change.
* Biggest challenge in BEM (and a source of debate amongst its users) is when an Element can instead by considered a Block.
	* Best advise is if you see yourself reusing the Element outside its associated Block, think about making it a B
	Block.

#### ebb Notes
BEM: do EVERYTHING in classes, don't use ids. 
BEM CSS conventions for classes: all lowercase class names: 
.sidebar
.main
.doc-card 
.filter-results
(this is called "spear notation" using hyphens as separators.) 

.main__title 
.doc-card__title
.doc-card__example
.doc-card__codeblock


Sample BEM code:

~~~css
.form {
  margin: 1rem;
}

.form__formset {
  border: 1px solid #eee;
}

.form__input {
  border: 0;
  border-bottom: 1px solid #666;
}

.form__label {
  font-size: 0.9rem;
  padding-right: 0.5rem;
}

.form__submit {
  display: block;
  margin: auto;
}
~~~

And the HTML that uses it:

~~~html
<form class="form">
  <div class="form__formset">
    <label for="name" class="form__label">Enter Your Name:</label>
    <input type="text" class="form__input" name="name" />
  </div>
  <div class="form__formset">
    <label for="age" class="form__label">Enter Your Age:</label>
    <input type="number" class="form__input" name="age" />
  </div>
  <div class="form__formset">
    <button type="submit" class="form__submit">Verify</button>
  </div>
</form>
~~~

#### ebb Notes: on the Modifier part of BEM:
.feedback {border-color:black;}
.feedback--modifier {border-color:red}
(a new class)
For an alert state, you could do a ternary state operation to switch class names in HTML under particular conditions. 

### CSS and Namespacing

One problem with CSS is it's global namespace, which means that every class, ID, and element rule you define in your CSS is placed into the same global lexicon. If you define a rule for a BEM Block called `.button` for use in one part of your project and then some other developer comes along and defines a BEM Block called `.button` for their part of the project, these two rules will collide in the global namespace of CSS.

Large projects address this by writing generalizable CSS modules that are then used across a project or by writing more specifically named classes (often using some kind of scoping system). The important point is CSS can get very chaotic quickly and when working in a team, it's good to have a style guide or set of standards for naming worked out in advance.

### CSS Namespacing with Create React App

Create React App supports what are called [CSS Modules](https://github.com/css-modules/css-modules). These load CSS as a JavaScript object instead of simply injecting a `<style>` tag into your document.

Any CSS or SCSS file with a `.module.css` or `.module.scss` extension can be loaded as a module. Instead of simply importing the file, you import an object, usually named `styles`. The keys on the `styles` object are equal to the classes defined in the CSS file, so you use those as your classNames (remembering that we are using a computed value instead of a string).

~~~javascript
import React from 'react';
import styles from './Form.module.css';

const Form = () => (
  <form className={styles.form}>
    <div className={styles['form__formset']}>
      <label for="name" className={styles['form__label']}>Enter Your Name:</label>
      <input type="text" className={styles['form__input']} name="name" />
    </div>
    <div className={styles['form__formset']}>
      <label for="age" className={styles['form__label']}>Enter Your Age:</label>
      <input type="number" className={styles['form__input']} name="age" />
    </div>
    <div className={styles['form__formset']}>
      <button type="submit" className={styles['form__submit']}>Verify</button>
    </div>
  </form>
);

export default Form;
~~~

Why would we do that? It seems like a pain, right?

If we look at this code in the browser, we see the following:

~~~html
<form class="Form_form__1Ddds">
    <div class="Form_form__formset__3KI_q">
        <label for="name" class="Form_form__label__1RIzs">Enter Your Name:</label>
        <input type="text" class="Form_form__input__2A-iN" name="name">
    </div>
    <div class="Form_form__formset__3KI_q">
        <label for="age" class="Form_form__label__1RIzs">Enter Your Age:</label>
        <input type="number" class="Form_form__input__2A-iN" name="age">
    </div>
    <div class="Form_form__formset__3KI_q">
        <button type="submit" class="Form_form__submit__1kRF6">Verify</button>
    </div>
</form>
~~~

The CSS Module loader used by Create React App has added some hash information to prevent namespace collisions.

So, while CSS Modules are a bit of a pain, they can be useful if you have issues regarding namespace.

The React ecology has a variety of JavaScript tools that address the chaos that can result in building large applications. However, as with CSS Modules and everything else we'll talk about today, tools that are more complicated than loading CSS into the global namespace are all going to add a degree of complication to your coding. Part of managing a React project is choosing tools whose inconveniences do not exceed their benefits. You may not need anything we talk about from here on out (CSS Modules, SASS, or CSS-in-JS) for most simple React projects, but a big project will most likely require something like this.

## Adding SASS to React
SASS stands for Syntactically Aware StyleSheets.

It is a CSS pre-processor that defines a super-set of CSS features (variables, mixins, functions, control structures) and offers a transpiler that processes this supped up version of CSS (called SCSS) into regular CSS. So, you write code in SCSS and have an application boilerplate (like Create React App) compile your SCSS into CSS code.

To add SASS support to Create React App, run `npm install node-sass` (but our sample project already has it loaded) and if you rename any files with a `.css` extension to a `.scss` extension, they will be processed by SASS.

## What Does SASS Offer?

SASS's big advantage over CSS is programmability. SASS is a programming language, while CSS is merely a mark-up language. The difference between the two is the presence or absence of loops and variables, which SASS adds to CSS syntax.

### Variables

The most important feature in SASS (imo) is the addition of variables. [There is an experimental implementation of variables in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/var), but it is not widely supported, so if you want variables in a CSS project, SASS is still the best way to go.

Why would you want variables in your CSS, you may ask? Well, say you're writing a large CSS file for an application and you want the `margin-bottom` for your components to be based on a 15px rhythm (so that you could have a double margin that would be 30px and a triple at 45px). If someone higher up in the project said "you know, I think that's not enough space, make the rhythm 20px", you might be doing a lot of find and replace to get all the rhythms in your code.

ebb notes: All CSS files can just be SCSS b/c SCSS can deal with old CSS too. 
Our NodeSass has a compiler and run a "watcher" on the command line over a directory with SCSS, so it can convert. But the original SASS interpreter was written in RUBY, though the original developers now work in Node. Whether NodeSass or RubySass, you compile your code in CSS and post. Jekyll (many Jekyll themes) support SASS out of the box.

In SCSS: variables begin with `$`: 

~~~scss
$rhythm: 15px;

p {
  margin-bottom: $rhythm;
}

p.double-mb {
  margin-bottom: 2 * $rhythm;
}

p.triple-mb {
  margin-bottom: 3 * $rhthm;
}
~~~

Now, you just change the definition of `$rhythm` to `20px` and your entire site will use the rhythm.

SASS doesn't actually do anything profound and most of the time, we use to save time for refactoring and things of that nature, however the big advantage for SASS is it makes CSS more DRY, which is our goal in all of these technologies.

### Imports

While you can import external files in CSS (usually used to load Google Fonts), SASS significantly turbocharges this feature, letting you import other `.scss` files into your project and including their variables, mixins, and functions.

So, for instance, now you can define a file called `variables.scss` and import it into any other SCSS file you use.

For instance:

`variables.scss` file:

~~~scss
$rhthym: 15px;
~~~

`Content.module.scss` file:

~~~scss
@import "variables.scss"; // Global import, starting from 'src/'
//@ import "./variables.scss"; // Relative import, starting from CWD

p {
  margin-bottom: $rhythm;
}

p.double-mb {
  margin-bottom: 2 * $rhythm;
}

p.triple-mb {
  margin-bottom: 3 * $rhthm;
}
~~~

Amazing!

This is also going to become really important when we talk about 3rd party SCSS frameworks in a bit.

### Mixins

Mixins offer the ability to include CSS code in a variety of contexts.

One example from the CSS article linked above is using mixins to set the font for an element. Consider:

`type.scss`:

~~~scss
// Font Stack Source: https://gist.github.com/don1138/5761014

$sans: Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;;
$serif: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif," "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;

$weight700: 700;
$weight400: 400;

@mixin font-sansN4 {
  font-family: $sans;
  font-weight: $weight400;
  font-style: normal;
}

@mixin font-sansI4 {
  font-family: $sans;
  font-weight: $weight400;
  font-style: italic;
}

@mixin font-sansN7 {
  font-family: $sans;
  font-weight: $weight700;
  font-style: normal;
}

@mixin font-sansI7 {
  font-family: $sans;
  font-weight: $weight700;
  font-style: italic;
}

@mixin font-serifN4 {
  font-family: $serif;
  font-weight: $weight400;
  font-style: normal;
}

@mixin font-serifI4 {
  font-family: $serif;
  font-weight: $weight400;
  font-style: italic;
}

@mixin font-serifN7 {
  font-family: $serif;
  font-weight: $weight700;
  font-style: normal;
}

@mixin font-serifI7 {
  font-family: $serif;
  font-weight: $weight700;
  font-style: italic;
}
~~~

Now, when we want to use our fonts:

~~~scss
@import "type.scss";

body {
  @include font-sansN4;
}

strong {
  @include font-sansN7;
}

em {
  @include font-sansI4;
}

strong em,
em strong {
  @include font-sansI7;
}
~~~

### Nesting

Consider the code we wrote above, resetting `strong em` and `em strong` with their own rule wasn't the worst thing in the world, *but* could we write it more succinctly?

SASS allows for nested tags, so you can write the following:

~~~scss
@import "type.scss";

body {
  @include font-sansN4;
}

strong {
  @include font-sansN7;

  em {
    @include font-sansI7;
  }
}

em {
  @include font-sansI4;

  strong {
    @include font-sansI7;
  }
}
~~~

Which produces the same thing. 

We can also shorten our paragraph spacing rules from earlier:

~~~scss
p {
  margin-bottom: $rhythm;

  &.double-mb {
    margin-bottom: 2 * $rhythm;
  }

  &.triple-mb {
    margin-bottom: 3 * $rhthm;
  }
}
~~~

The ampersand (`&`) in that code is translated by SASS as "the current selector", so the `&.double-mb` translates as `p.double-mb`.

Overall, nesting is really cool, but a lot of people, including the author of that article I linked to at the beginning of today, find it to produce unnecessarily complex code (particularly if you are trying to shorten rules; SASS's syntax hides the fact that if you are four or five nests deep (we've all been there!), it's generating really complex selectors).

One place where nesting is very useful, is defining link behavior:

~~~scss

a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
~~~

Though, to be honest, if you are writing well-structured CSS, you don't really need to use nesting for this.

### Functions

Where Mixins allow repeatable units of CSS rules, functions are used to compute values that may not be CSS rules.

For instance, consider the paragraph rules we defined above for `margin-bottom`. We can rewrite those using a function:

~~~scss
$rhythm: 15px;

@function rhythm($range: 1) {
  @return $rhythm * $range;
}

p {
  margin-bottom: rhythm();
}

p.double-mb {
  margin-bottom: rhythm(2);
}

p.triple-mb {
  margin-bottom: rhythm(3);
}
~~~

We also set a default `$range` of 1 using SASS's default parameter syntax.

*Note*: you can also pass parameters to mixins. For instance, just for illustrative purposes, we could write:

~~~scss
$rhythm: 15px;

@function rhythm($range: 1) {
  @return $rhythm * $range;
}

@mixin mb-rhythm($range: 1) {
  margin-bottom: rhythm($range);
}

p {
  @include mb-rhythm();
}

p.double-mb {
  @include mb-rhythm(2);
}

p.triple-mb {
  @include mb-rhythm(3);
}
~~~

This is probably overkill, but it illustrates the differences between functions and mixins in SASS.

#### Dealing with Units in SASS

SASS takes units very seriously. However, it does allow you to easily convert between them. Here are the rules for unit math in SASS:

* To give a number a unit, multiply the value per one member of the desired unit (e.g. 42 * 1px);
* To remove unit from a number, divide by one member of the relevant unit (e.g. 42px / 1px);
* When adding or subtracting two numbers with different compatible units, result is expressed in the unit of the first member;
* To convert a value from one unit to another (compatible), add the value to 0 member of the final unit (e.g. 0px + 42in).

Some unit conversions result in SASS reporting "incompatible units". Many times, these units (such as `rem` or `%`) require a context. In browsers that have not changed the `font-size` property on `html`, the default size is `16px`. Knowing this, we can write the following to convert incompatible units, using rules we already learned above:

~~~scss
$browser-context: 16px;

@function pixToRem($pixels, $context: $browser-context) {
  @return 0rem + ($pixels / $context);
}

@function pixToPercentage($pixels, $context: $browser-context) {
  @return 100% * ($pixels / $context);
}
~~~

### Control Structures

In addition to variables, functions, and mixins, SASS has all the features you would expect from a modern programming language.

#### `if/else`

You can use boolean tests to branch your CSS code:

~~~scss
$fontSize: 28px;

p {
  font-size: $fontSize;
  @if(fontSize > 25px) {
    color: red;
  } @else {
    color: blue;
  }
}
~~~

##### ebb: NOTE: 
* SASS has no capacity to read HTML the way JavaScript can read innerHTML. So the if/else stuff responds to CSS styling only. 
* if/else isn't that widely used in SASS

#### Loops

You can also iterate on structures.

Here's some code I wrote for my SASS and Markdown driven slide application:

~~~scss
@for $i from 5 through 150 {
  .f#{$i}px {
    blockquote,
    p,
    li,
    td,
    .remark-code {
      font-size: $i * 1px;
      line-height: 1.4;
      & small {
        font-size: $i * 0.85px;
      }
    }
  }
  span.f#{$i}px {
    font-size: $i * 1px;
    line-height: 1.4;
  }
  // Size emoji:
  .f#{$i}px img.emoji {
    height: $i *1px;
    max-height: 72px;
  }
}
~~~

I needed to generate classes of the form `.fXXpx` to set pixel-based font sizes for slides (to increase readability). The syntax for the rules (`.f#{$i}px`) is how you insert variables into CSS selector rules in SASS.

Sass also has `@while`:

~~~scss
$num: 4;

@while $num > 0 {
    .module-#{$num} {
        content: "#{$num}";
    }

    $num: $num - 1;
}
~~~

And `@each`:

~~~scss
// Source: https://alligator.io/sass/each-loops/

$shapes: triangle, square, circle;

@each $shape in $shapes {
  .icon-#{$shape} {
    background-image: url('/images/#{$shape}.jpg');
  }
}
~~~

#### Map

SASS also has a key/value based data structure, called a map. You can define one like this:

~~~scss
$headingSizes: (
  h1: 20px,
  h2: 16px,
  h3: 14px
);
~~~

Maps are useful, as above, for setting multiple values in the same place. They can also be useful for things like colors or themes.

You can access a Map using `map-get`. Here's an example for building a mixin that uses maps to manage breakpoints in CSS:

~~~scss
// Source: https://www.sitepoint.com/using-sass-maps/

$breakpoints: (
  small: 767px,
  medium: 992px,
  large: 1200px
);

@mixin respond-to($breakpoint) { 
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: #{map-get($breakpoints, $breakpoint)}) {
      @content;
    }
  }

  @else {
    @warn "Unfortunately, no value could be retrieved from `#{$breakpoint}`. "
        + "Please make sure it is defined in `$breakpoints` map.";
  }
}

.element {
  color: hotpink;

  @include respond-to(small) {
    color: tomato;
  }
}
~~~

You can also use an `@each` loop to parse a map:

~~~scss
// Source: https://alligator.io/sass/each-loops/

$headingSizes: (
  h1: 20px,
  h2: 16px,
  h3: 14px
);

@each $element, $size in $map {
  #{$element} {
    font-size: $size;
  }
}
~~~

*Note: in SASS, there are two comment syntaxes. Lines that begin with `//` are removed in pre-processing. Lines that begin with `/*` and end with `*/` (which is the CSS comment syntax) are passed through pre-processing.*

## Recommended SASS Rules

1. Use variables for z-index scale, colors, fonts
1. Use mixins to set typography and functions to set rhythm-based sizing.

## SCSS/CSS Frameworks

There are *many* different approaches to building websites using DRY CSS code. The most famous is probably Bootstrap, which offers a really easy-to-use set of components and utility CSS for rapidly building functional websites. The downside for Bootstrap is that, as it becomes more popular, websites start to resemble one another.

One way to make Bootstrap less Bootstrap-y is customizing it. If you use something like [Bootswatch](https://bootswatch.com/), you get some free themes. There are a lot of pay themes. However, if you want to customize Bootstrap for yourself, you have to use SASS.

### Using SCSS w/ CRA

To install Bootstrap in CRA, you run `npm install bootstrap`. Also, if you intend to use Bootstrap's JavaScript components, you need to run `npm install jquery popper.js` as Bootstrap depends on them.

You can then create an SCSS file, called say `src/custom-bootstrap.scss` and include the following:

~~~scss
// Override default variables before the import
$body-bg: #000;

// Import Bootstrap and its default variables
@import '~bootstrap/scss/bootstrap.scss';
~~~

That last import, starting with a `~`, is how you include SCSS from a package installed with NPM.

In SASS, you can define a variable with the `!default` option (so `$myvariable: 1px !default;`). If you do this and someone else defines the variable before the code you wrote is executed (as we are doing above), the variable set earlier overrides the default value; otherwise, the default is used. Bootstrap defines all its variables like this, so you can redefine as much or as little of Bootstrap's framework as you like.

To use JavaScript components, you need to add the following lines to `src/index.js`:

~~~javascript
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
~~~

Other Frameworks you can use for applications:

* [Bootstrap](https://getbootstrap.com/)
* [Foundation](https://foundation.zurb.com/)
* [Cutestrap](https://www.cutestrap.com/)
* [Bulma](https://bulma.io/)
* [Sierra](http://sierra-library.github.io/)
* [Hocus Pocus](https://bkzl.github.io/hocus-pocus/)

### Functional CSS Libraries

As with functional composition and style composition in Emotion, some web designers have begun to think in terms of functional CSS, which is to say a series of standardized classes that add certain small features to HTML elements that, when added together, produce a more complex behavior.

Here's an HTML example using Tachyons:

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>TACHYONS - Buttons | Basic Rounded Extra Small</title>
    <meta name="description" content="Tachyons Component">
      <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="author" content="@mrmrs">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css">
  </head>
  <body class="w-100 sans-serif bg-white pt5">
    <div class="ph3">
      <a class="f6 link dim br1 ph3 pv2 mb2 dib white bg-navy" href="#0">Button Text</a>
      <a class="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-blue" href="#0">Button Text</a>
      <a class="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-green" href="#0">Button Text</a>
    </div>
  </body>
</html>
~~~

Breaking down the classes on the `<a>` tags:

* `f6` - Sets the font size (to 6, which is a defined scale of values)
* `link` - Sets basic link behavior
* `dim` - Dims the button on mouseover
* `br1` - Sets a rounded border-radius
* `ph3` - Sets horizontal padding
* `pv2` - Sets vertical padding
* `mb2` - Sets bottom margin
* `dib` - Sets `display: inline-block`
* `white` - Sets `color: white`
* `bg-` - Sets the background to various colors

And so on and so forth. Tachyons adds a lot of `class=""` props to your HTML (or JSX in React) but the CSS for your entire application is of a fixed (and relatively small) size.

Also, as with the SCSS frameworks above, Tachyons is available [as a SASS library](https://github.com/tachyons-css/tachyons-sass) so you can customize the sizing scales, fonts, and colors.

Tachyons are also fairly easy to incorporate into a React project. Just include the CDN link (`https://unpkg.com/tachyons/css/tachyons.min.css`) in `public/index.html` inside the `<head>` tag and use strings of Tachyons as `className` props for your React components:

~~~javascript
import React from 'react';

const BUTTON_TACHYONS = 'f6 link dim br1 ph3 pv2 mb2 dib';
const CONTAINER_TACHYONS = 'ph3';

const ButtonBar = (props) => {
  const {
    buttons
  } = props;
  
  return (
    <div className=`CONTAINER_TACHYONS`>
      {
        buttons.map((button, i) => (
          <a
            className={`${BUTTON_TACHYONS ${button.color || white} bg-${button.background || black}`}
            href={button.href}
          >{button.text}</a>
        )
      }
    </div>
  );
}

~~~

Links:

* [BassCSS](https://github.com/basscss/basscss)
* [Tachyons](http://tachyons.io/)

#### Background Info

* [What is Functional CSS?](https://jon.gold/2015/07/functional-css/)
* [CSS and Scalability](http://mrmrs.cc/writing/2016/03/24/scalable-css/)
* [Rationalizing Functional CSS](https://marcelosomers.com/writing/rationalizing-functional-css/)

## Emotion.js

[Emotion](https://emotion.sh/) is a CSS-in-JS framework, which lets us write CSS in JavaScript and use it directly with our React components. Instead of having a separate CSS file, the CSS lives right in the JS code.

There are a couple different ways to use it. The core model uses a custom JSX renderer to add a `css` prop to all React components and a `css` function to fill that prop.

For instance,

~~~javascript
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const StyledComponent = () => {
  return (
    <div css={css`
      margin: auto;
      width: 500px
    `}>
      <h1 css={css`color: hotpink;`}>Title</h1>
    </div>
  );
}
~~~

You can also use Emotion's `styled` interface to make new, reusable components

For instance, here's a quick, pink button:

~~~ javascript
import React from 'react';
import styled from '@emotion/styled';

const Title = styled.h1`
  color: hotpink;
`;

const Container = styled.div`
  margin: auto;
  width: 500px;
`;

const StyledComponent = () => {
  return (
    <Container>
      <Title>Title</Title>
    </Container>
  );
}
~~~

If you need global styles, you can use the `Global` component in React:

~~~javascript
import React from 'react';
import { Global, css } from '@emotion/core';

const App = () => {
  return (
    <div>
      <Global styles={css`
        body {
          background: black;
          color: white;
        }
      `} />
    </div>
  )
}
~~~

Just like with functional composition, you can use Emotion to compose CSS:

~~~javascript
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const danger = css`
  color: red;
`;

const base = css`
  background-color: darkgreen;
  color: turquoise;
`;

const StyledComponent = () => {
  return (
    <div>
      <div css={base}>This will be turquoise</div>
      <div css={[danger, base]}>
        This will be also be turquoise since the base styles
        overwrite the danger styles.
      </div>
      <div css={[base, danger]}>This will be red</div>
    </div>
  )
}
~~~

Emotion can also nest selectors like in SASS:

~~~javascript
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const paragraph = css`
  color: turquoise;

  a {
    border-bottom: 1px solid currentColor;
    cursor:pointer;
  }

  header & {
    color: green;
  }
`;

const Component = () => {
  return (
    <header>
      <p css={paragraph}>
        This is green since it's inside a header
      </p>
    </header>
    <p css={paragraph}>
      Some text. <a>A link with a bottom border.</a>
    </p>
  );
}
~~~

* Why would we use Emotion?
* What could be problems associated with it?

## Exercises!

Let's spend the rest of today trying to style the two React components from yesterday. Try doing both with different technologies (using Emotion for one and functional CSS for another, for instance).

The user component may be a bit more of a test case, as you can style lists in a lot of interesting ways, in addition to styling forms.

### Other Ideas

* Use [Adorable Avatars](http://avatars.adorable.io/) to generate user images for the user list React component
	* Can we style those avatars as well?
* Can we use [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to change the layout of your components?
	* [Flexbox Froggy](https://flexboxfroggy.com/) is the classic tutorial for learning flexbox

### Useful Links

* [Tachyons Component Gallery](https://tachyons.io/components/)
	* Use these to add pre-made Tachyons components to your projects!
* [Google Fonts](https://fonts.google.com/)
	* Web fonts greatly increase the typographic options online
* [Font Stacks](https://gist.github.com/don1138/5761014)
	* CSS Font Stacks for the modern web
* [SASS Color Functions](https://www.tutorialsteacher.com/sass/sass-color-functions)
	* SASS has a variety of helpful color manipulation functions
	* [In-depth tutorial on using these to generate a full palette for theming](https://www.sitepoint.com/using-sass-build-color-palettes/)
* [Theming in Emotion](https://emotion.sh/docs/emotion-theming)


