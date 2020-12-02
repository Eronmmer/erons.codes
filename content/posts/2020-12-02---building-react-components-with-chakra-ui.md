---
title: Building React Components with Chakra UI
date: "2020-12-02T22:40:32.169Z"
template: "post"
draft: false
slug: "/building-react-components-with-chakra-ui/"
category: "React"
tags:
  - "React"
  - "Node.js"
  - "Chakra UI"
description: "In this article, I'll show you how to create reusable React components using Chakra UI."
socialImage: "/media/building-react-components-with-chakra-ui.png"
---

![Chakra UI logo](/media/building-react-components-with-chakra-ui.png)

In this article, we'll learn how to create React components with Chakra UI by building a landing page for a Travel Agency.

There are a number of React Component Libraries that make it easy for developers to build and style React applications in a consistent way. Some of these libraries come with design systems that make it difficult for developers to override or extend default styles. Others are either not accessible or have a high learning curve.

## Why Chakra UI?

Chakra UI is a component library that simplifies the process of building and styling simple, modular and accessible React components through the use of utility style props. These style props make it easy to override and extend component styles, reduce the need for custom stylesheets and unnecessarily complex media queries. Developers can quickly get started with Chakra UI's minimal component API.

Below is a screenshot of the header from the completed project:

<!-- image here(screenshot of implemented landing page) -->
<!-- <img src="/images/chakra-1.jpg" /> -->

![Screenshot 1](/media/chakra-1.jpg)

[Here](https://chakra-landing.netlify.app/) is a link to the hosted project.

If you're just interested in the complete code for this article, you can check the git repository [here](https://github.com/Eronmmer/chakra-landing).

## Prerequisites

- Node.js installed
- Fair knowledge of React

## Getting Started

First, we have to bootstrap a React application and install the necessary dependencies needed to use Chakra UI. By running the following commands, you should have a React app setup with Chakra UI and it's peer dependencies installed.

```bash
# Bootstrap a react app

npx create-react-app chakra-app
```

```bash
# Install Chakra UI in the root directory of your project

yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

For Chakra UI to work correctly across your application, you need to setup the Provider in the root of your application. In this case, we'll do that in the `index.js` file in the `src` directory.
We'll also create a custom theme to enable us customize components and build a design system. Although optional, customized themes define numerous properties such as the color pallets, fonts and break points.

In your `src` directory, create a `customTheme.js` file and add the following code:

```js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
	fonts: {
		body: "Mulish, sans-serif",
		heading: "Playfair Display, serif",
		mono: "Menlo, monospace",
	},
	colors: {
		brand: {
			orange: "#FB8F1D",
			orangeButton: {
				500: "#fb8f1d",
				600: "#e27604",
			},
			yellow: "#FFBB0C",
			green: "#1ABE84",
			black: "#000000",
			white: "#ffffff",
			darkBlack: "#202336",
			lightBlack: "#4A4C53",
			borderBlack: "#AFB0B9",
			lightGrey: "#B8BECD",
			greyText: "#7D7987",
			footerGrey: "#848484",
		},
	},
	fontWeights: {
		heading: 600,
		bolder: 800,
		boldest: 900,
	},
});

export default customTheme;
```

In the custom theme above, we defined our fonts, colors and font weights. We can use these defined colors in our app like so `color="brand.yellow"`.

Now you can add the following code to your `index.js` file

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./customTheme";

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider resetCSS theme={customTheme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
```

The optional `resetCSS` prop applies css reset styles to your application to remove some browser default styles and our customTheme is applied by passing a valid value to the theme.

We'll be using three google fonts. To follow along, add the following in the `head` section of the `index.html` file in your `public` directory:

```html
<link
	href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
	rel="stylesheet"
/>
<link
	href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
	rel="stylesheet"
/>
<link
	href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,400;0,700;1,300;1,500&display=swap"
	rel="stylesheet"
/>
```

## Components

The app will be divided into seven sections: The header, five other sections and the footer. These will live in separate files in the `sections` folder. We'll also create a `components` folder that will house some of our reusable code. We'll start by creating these components.

Create a `components` folder inside the `src` directory and create three files. `button.js`, `container.js` and `mobileNav.js`.

Add the following code to the `button.js` file.

```js
import * as Chakra from "@chakra-ui/react";

const CustomButton = (props) => {
	return (
		<Chakra.Button
			colorScheme="brand.orangeButton"
			py="1.2rem"
			px="3rem"
			color="white"
			transition=".3s ease-out"
			_hover={{ paddingRight: "4rem" }}
			{...props}
		/>
	);
};

export default CustomButton;
```

This is a custom button component whose color and transition behavior have been defined. As you can see, it's very easy to style components using Chakra UI's style props. `colorScheme` here gives a background color to the button with a color defined in the default or custom theme. `_hover` defines the styles of the component when it's hovered.

Next, add the following code to the `container.js` file.

```js
import { Box } from "@chakra-ui/react";

const Container = (props) => {
	return (
		<Box
			mx="auto"
			px={{ base: "1rem", md: "1.3rem", lg: ".5rem" }}
			maxWidth={["720px", "720px", "720px", "960px", "1150px"]}
			borderRadius="8px"
			{...props}
		/>
	);
};

export default Container;
```

The container component above will be used to center content horizontally and provide padding.

The `Box` component from Chakra UI renders a `div` element by default.
Notice how the shape of the values for `px` and `maxWidth` props are different? These style the horizontal paddings and maximum width of the component respectively. Chakra UI lets you provide object or array values to add mobile-first responsiveness that use the default breakpoints defined by Chakra UI or custom breakpoints in your custom theme object.

To better understand how responsiveness works in Chakra UI, you have to keep in mind that the default breakpoints object looks like this:

```js
const breakpoints = {
	sm: "30em",
	md: "48em",
	lg: "62em",
	xl: "80em",
};
```

With the array syntax, Chakra UI converts the values defined in the default or custom breakpoints object and sorts them in ascending order. Meaning, if you have a component styled this way:

```js
<Box bg="red.200" w={[300, 400, 500, 600]}>
	This is a box
</Box>
```

it's width will be 400px from 30em, 500px from 48em and 600px from 62em.

The object syntax is easy to understand since all you have to do is define responsive values with breakpoint aliases in the object. Any value that is not defined in the default or custom breakpoints object(like `base`) will be used as the base value.

Let's go on to build more components. Add the following code to your `mobileNav.js` file.

```jsx
import { Box, Text, Flex, Link, Image } from "@chakra-ui/react";
import Container from "./container";

const MobileNav = ({ removeNavbarHandler, mobileNavOpen }) => {
	return (
		<Box
			position="fixed"
			zIndex="10"
			top="0"
			left="0"
			height="100vh"
			width="100%"
			backgroundColor="brand.white"
			d={mobileNavOpen ? "block" : "none"}
		>
			<Container>
				<Flex mb="3rem" justify="space-between" align="center" mt={6}>
					<Link
						href="#!"
						_hover={{ textDecoration: "none" }}
						position="relative"
					>
						<Image
							_hover={{ transform: "scale(1.1)" }}
							transition=".3s ease-out"
							alt="Logo"
							src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/brand_logo.png"
						/>
					</Link>
					<Box
						position="relative"
						onClick={removeNavbarHandler}
						cursor="pointer"
						d={{ base: "block", md: "none" }}
					>
						<Box
							position="absolute"
							transform="rotate(45deg)"
							w={8}
							h="3px"
							backgroundColor="brand.black"
							mb={2}
						/>
						<Box
							transform="rotate(135deg)"
							w={8}
							h="3px"
							backgroundColor="brand.black"
							mb={2}
						/>
					</Box>
				</Flex>

				<Flex
					fontFamily="inter"
					alignItems="center"
					justifyContent="space-between"
					flexDir="column"
					height="60vh"
				>
					<Link
						color="brand.darkBlack"
						href="#!"
						_hover={{ textDecoration: "none" }}
					>
						<Text
							_hover={{ transform: "scale(1.1)" }}
							transition=".3s ease-out"
						>
							Home
						</Text>
					</Link>
					<Link
						color="brand.lightGrey"
						href="#!"
						_hover={{ textDecoration: "none" }}
					>
						<Text
							_hover={{ transform: "scale(1.1)" }}
							transition=".3s ease-out"
						>
							Destinations
						</Text>
					</Link>
					<Link
						color="brand.lightGrey"
						href="#!"
						_hover={{ textDecoration: "none" }}
					>
						<Text
							_hover={{ transform: "scale(1.1)" }}
							transition=".3s ease-out"
						>
							About
						</Text>
					</Link>
					<Link
						color="brand.lightGrey"
						href="#!"
						_hover={{ textDecoration: "none" }}
					>
						<Text
							_hover={{ transform: "scale(1.1)" }}
							transition=".3s ease-out"
						>
							Partner
						</Text>
					</Link>
					<Link
						color="brand.orange"
						border="1px solid #FB8F1D"
						borderRadius="8px"
						px="2rem"
						py=".3rem"
						href="#!"
						_hover={{ textDecoration: "none" }}
					>
						<Text
							_hover={{ transform: "scale(1.1)" }}
							transition=".3s ease-out"
						>
							Login
						</Text>
					</Link>
					<Link
						backgroundColor="brand.orange"
						color="brand.white"
						borderRadius="8px"
						px="2rem"
						py=".37rem"
						href="#!"
						_hover={{ textDecoration: "none" }}
					>
						<Text
							_hover={{ transform: "scale(1.1)" }}
							transition=".3s ease-out"
						>
							Register
						</Text>
					</Link>
				</Flex>
			</Container>
		</Box>
	);
};

export default MobileNav;
```

With the component above as the name implies, is a navbar that is only visible on mobile/smaller widths. From this component, we can see that Chakra UI also provides other components like `Flex`, `Image` and `Text`. The `Flex` component which also renders a `div` element by default makes it easy to style flex items with style props like `align`, `justify`, `direction`, `grow`, `shrink` and `wrap`.

## Main sections

Create a `sections` folder in the `src` directory then create a `header.js` file. Add the following code to this file.

```jsx
import * as React from "react";
import {
	Box,
	Image,
	Flex,
	Link,
	Heading,
	Text,
	Select,
} from "@chakra-ui/react";
import Container from "../components/container";
import Button from "../components/button";
import MobileNav from "../components/mobileNav";

const Header = () => {
	const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
	const removeNavbarHandler = () => {
		setMobileNavOpen(false);
	};
	const openNavbar = () => {
		setMobileNavOpen(true);
	};
	return (
		<Box position="relative" mb={["5rem", "7rem", "10rem", "12rem"]}>
			<Container position="relative">
				<Box position="absolute" bottom="40%" left="-5%">
					<Image
						mr="auto"
						width="1rem"
						src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_circle.svg"
					/>
				</Box>
				<Flex
					mb="2rem"
					py="1.5rem"
					as="header"
					alignItems="center"
					justifyContent="space-between"
				>
					<Box flex={{ base: "1", md: "0.2", lg: "0.5", xl: "0.8" }}>
						<Link
							href="#!"
							_hover={{ textDecoration: "none" }}
							position="relative"
						>
							<Image
								_hover={{ transform: "scale(1.1)" }}
								transition=".3s ease-out"
								alt="Logo"
								src="https://res.cloudinary.com/djksghat4/image/upload/v1606868554/chakra/brand_logo.png"
							/>
						</Link>
					</Box>
					<Flex
						fontFamily="inter"
						alignItems="center"
						justifyContent="space-between"
						flex="1"
						d={{ base: "none", md: "flex" }}
					>
						<Link
							color="brand.darkBlack"
							href="#!"
							_hover={{ textDecoration: "none" }}
						>
							<Text
								_hover={{ transform: "scale(1.1)" }}
								transition=".3s ease-out"
							>
								Home
							</Text>
						</Link>
						<Link
							color="brand.lightGrey"
							href="#!"
							_hover={{ textDecoration: "none" }}
						>
							<Text
								_hover={{ transform: "scale(1.1)" }}
								transition=".3s ease-out"
							>
								Destinations
							</Text>
						</Link>
						<Link
							color="brand.lightGrey"
							href="#!"
							_hover={{ textDecoration: "none" }}
						>
							<Text
								_hover={{ transform: "scale(1.1)" }}
								transition=".3s ease-out"
							>
								About
							</Text>
						</Link>
						<Link
							color="brand.lightGrey"
							href="#!"
							_hover={{ textDecoration: "none" }}
						>
							<Text
								_hover={{ transform: "scale(1.1)" }}
								transition=".3s ease-out"
							>
								Partner
							</Text>
						</Link>
						<Link
							color="brand.orange"
							border="1px solid #FB8F1D"
							borderRadius="8px"
							px="2rem"
							py=".3rem"
							href="#!"
							_hover={{ textDecoration: "none" }}
						>
							<Text
								_hover={{ transform: "scale(1.1)" }}
								transition=".3s ease-out"
							>
								Login
							</Text>
						</Link>
						<Link
							backgroundColor="brand.orange"
							color="brand.white"
							borderRadius="8px"
							px="2rem"
							py=".37rem"
							href="#!"
							_hover={{ textDecoration: "none" }}
						>
							<Text
								_hover={{ transform: "scale(1.1)" }}
								transition=".3s ease-out"
							>
								Register
							</Text>
						</Link>
					</Flex>
					<Box
						onClick={openNavbar}
						cursor="pointer"
						d={{ base: "block", md: "none" }}
					>
						<Box w={8} h="3px" backgroundColor="brand.black" mb={2} />
						<Box w={8} h="3px" backgroundColor="brand.black" mb={2} />
						<Box w={8} h="3px" backgroundColor="brand.black" mb={2} />
					</Box>
				</Flex>

				<Flex flexDir={{ base: "column", md: "row" }} justify="space-between">
					<Box flex="1">
						<Heading mt={{ base: 0, md: "2rem" }} size="2xl" as="h1">
							Explore and <Box as="br" /> Travel
						</Heading>
						<Box mt="3rem">
							<Text
								fontFamily="inter"
								fontWeight="bold"
								color="brand.darkBlack"
							>
								Holiday finder
							</Text>
							<Box
								mt=".6rem"
								backgroundColor="brand.darkBlack"
								width="1.8rem"
								height="2px"
								borderRadius="4px"
							/>

							<Box width="80%" mt="2rem" as="form">
								<Flex mb="1.5rem">
									<Select mr=".6rem" placeholder="Location">
										<option value="option1">Option 1</option>
										<option value="option2">Option 2</option>
										<option value="option3">Option 3</option>
									</Select>
									<Select placeholder="Activity">
										<option value="option1">Option 1</option>
										<option value="option2">Option 2</option>
										<option value="option3">Option 3</option>
									</Select>
								</Flex>
								<Flex>
									<Select mr=".6rem" placeholder="Grade">
										<option value="option1">Option 1</option>
										<option value="option2">Option 2</option>
										<option value="option3">Option 3</option>
									</Select>
									<Select placeholder="Date">
										<option value="option1">Option 1</option>
										<option value="option2">Option 2</option>
										<option value="option3">Option 3</option>
									</Select>
								</Flex>

								<Button mt="1.5rem">Explore</Button>
							</Box>
						</Box>
					</Box>
					<Box mt={{ base: "3.5rem", md: 0 }} flex="1">
						<Image
							width={{ base: "100%", sm: "60%", lg: "100%" }}
							alt="Travel"
							src="https://res.cloudinary.com/djksghat4/image/upload/v1606868550/chakra/hero_image.png"
						/>
					</Box>
				</Flex>
			</Container>
			<MobileNav
				mobileNavOpen={mobileNavOpen}
				removeNavbarHandler={removeNavbarHandler}
			/>
		</Box>
	);
};

export default Header;
```

From this component, we can see how to use more style props supported by Chakra UI like `mt` for margin-top styles, `mb` for margin-bottom. The `as` prop can also be used in any component that allows you pass an a HTML tag or component to be rendered. For example, if you have a `Text` component and you need it to be rendered as a `span` instead of a `p`, you can use the `as` prop like so: `<Text as="span">a paragraph</Text>

With the `Heading` component, we can define headlines. It renders a `h2` tag by default but you can use the `as`, `size` and other props to style it however you want.

To see our header, we need to edit our `App.js` file. Add the following code to your `App.js` file.

```jsx
import { Box } from "@chakra-ui/react";
import Header from "./sections/header";

function App() {
	return (
		<Box>
			<Header />
		</Box>
	);
}

export default App;
```

As we create more components, we'll import and include them in our `App` component.

Create a `sectionTwo` file in the `sections` folder and add the following code:

```jsx
import { Box, Text, Image, Heading, Flex } from "@chakra-ui/react";
import Container from "../components/container";
import Button from "../components/button";

const sectionTwo = () => {
	return (
		<Box mb={["5rem", "7rem", "10rem", "12rem"]} as="section">
			<Container>
				<Flex
					flexDir={{ base: "column-reverse", md: "row" }}
					align="center"
					justify="space-between"
				>
					<Box mt={{ base: "3.5rem", md: 0 }} flexBasis="48%">
						<Image
							width={{ base: "100%", sm: "60%", lg: "100%" }}
							src="https://res.cloudinary.com/djksghat4/image/upload/v1606868552/chakra/second_section.png"
						/>
					</Box>
					<Box flexBasis="40%">
						<Heading mb="1.5rem" size="xl" as="h2">
							A new way to explore the world
						</Heading>
						<Text
							maxWidth={{ base: "auto", md: "430px" }}
							color="brand.greyText"
							mb="1rem"
						>
							For decades travellers have reached for Lonely Planet books when
							looking to plan and execute their perfect trip, but now, they can
							also let Lonely Planet Experiences lead the way
						</Text>
						<Button mt="1.5rem" py="1rem">
							Learn more
						</Button>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
};

export default sectionTwo;
```

update your `App.js` file by importing this created file and placing it below `<Header />`

Next, create a `sectionThree` file in the `sections` folder and add the following code:

```jsx
import { Box, Text, Image, Heading, Flex } from "@chakra-ui/react";
import Container from "../components/container";

const sectionThree = () => {
	return (
		<Box mb={["5rem", "6rem", "10rem"]} as="section">
			<Container position="relative">
				<Box position="absolute" bottom="50%" left="-5%">
					<Image
						mr="auto"
						width="1rem"
						src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_plus.svg"
					/>
				</Box>
				<Flex mb="2.4rem" justify="space-between" align="center">
					<Heading>Featured destinations</Heading>
					<Flex cursor="pointer" justify="space-around" align="center">
						<Text mr="5px" fontFamily="Inter" color="brand.orange">
							View all
						</Text>
						<Image src="https://res.cloudinary.com/djksghat4/image/upload/v1606868554/chakra/arrow_right.svg" />
					</Flex>
				</Flex>
				<Flex
					flexWrap="wrap"
					gridRowGap="2rem"
					justify="space-between"
					align="center"
				>
					<Box position="relative">
						<Image
							width="80%"
							mx="auto"
							borderRadius="10px"
							src="https://res.cloudinary.com/djksghat4/image/upload/v1606868550/chakra/featured1.png"
						/>
						<Box
							position="absolute"
							bottom="-1px"
							left="9%"
							borderTopRightRadius="10px"
							pr="1.8rem"
							pt=".7rem"
							backgroundColor="brand.white"
						>
							<Text fontWeight="bold">Raja Ampat</Text>
							<Text color="brand.greyText">Indonesia</Text>
						</Box>
					</Box>
					<Box position="relative">
						<Image
							width="80%"
							mx="auto"
							borderRadius="10px"
							src="https://res.cloudinary.com/djksghat4/image/upload/v1606868550/chakra/featured2.png"
						/>
						<Box
							position="absolute"
							bottom="-1px"
							left="9%"
							borderTopRightRadius="10px"
							pr="1.8rem"
							pt=".7rem"
							backgroundColor="brand.white"
						>
							<Text fontWeight="bold">Fanjingshan</Text>
							<Text color="brand.greyText">China</Text>
						</Box>
					</Box>
					<Box position="relative">
						<Image
							width="80%"
							mx="auto"
							borderRadius="10px"
							src="https://res.cloudinary.com/djksghat4/image/upload/v1606868550/chakra/featured3.png"
						/>
						<Box
							position="absolute"
							bottom="-1px"
							left="9%"
							borderTopRightRadius="10px"
							pr="1.8rem"
							pt=".7rem"
							backgroundColor="brand.white"
						>
							<Text fontWeight="bold">Vevy</Text>
							<Text color="brand.greyText">Switzerland</Text>
						</Box>
					</Box>
					<Box position="relative">
						<Image
							width="80%"
							mx="auto"
							borderRadius="10px"
							src="https://res.cloudinary.com/djksghat4/image/upload/v1606868550/chakra/featured4.png"
						/>
						<Box
							position="absolute"
							bottom="-1px"
							left="9%"
							borderTopRightRadius="10px"
							pr="1.8rem"
							pt=".7rem"
							backgroundColor="brand.white"
						>
							<Text fontWeight="bold">Skadar</Text>
							<Text color="brand.greyText">Montenegro</Text>
						</Box>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
};

export default sectionThree;
```

update your `App.js` by importing this newly created section and do the same for the other files namely `sectionFour.js`, `sectionFive.js`, `sectionSix.js` and `footer.js` with the following content:

### `sectionFour.js`

```jsx
import { Box, Text, Image, Heading, Flex } from "@chakra-ui/react";
import Container from "../components/container";
import Button from "../components/button";

const sectionFour = () => {
	return (
		<Box mb={["5rem", "7rem", "10rem", "12rem"]} as="section">
			<Container>
				<Flex
					flexDir={{ base: "column", md: "row" }}
					align="center"
					justify="space-between"
				>
					<Box mb={{ base: "3rem", md: 0 }} flexBasis="40%">
						<Box ml="2rem">
							<Image
								mr="auto"
								width="1rem"
								src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_circle.svg"
							/>
						</Box>
						<Heading mt="2rem" mb="1.5rem" size="xl" as="h2">
							Guides by Thousand <Box as="br" /> Sunny
						</Heading>
						<Text
							maxWidth={{ base: "auto", md: "430px" }}
							color="brand.greyText"
							mb="1rem"
						>
							Packed with tips and advice from our on-the-ground experts, our
							city guides app (iOS and Android) is the ultimate resource before
							and during a trip.
						</Text>
						<Button mt="1.5rem" py="1rem">
							Download
						</Button>
					</Box>
					<Box flexBasis="48%">
						<Image
							width={{ base: "100%", sm: "60%", lg: "100%" }}
							src="https://res.cloudinary.com/djksghat4/image/upload/v1606868550/chakra/fourth_section.png"
						/>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
};

export default sectionFour;
```

### `sectionFive.js`

```jsx
import { Box, Text, Heading, Flex, Image } from "@chakra-ui/react";
import Container from "../components/container";

const sectionFive = () => {
	return (
		<Box mb={["5rem", "7rem", "8rem", "10rem"]} as="section">
			<Container position="relative">
				<Box position="absolute" bottom="50%" left="-5%">
					<Image
						mr="auto"
						width="1rem"
						src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_circle.svg"
					/>
				</Box>
				<Heading mb="3rem" as="h3" size="xl">
					Testimonials
				</Heading>
				<Flex
					flexDir={{ base: "column", md: "row" }}
					justify="space-between"
					align="center"
				>
					<Box mb={{ base: "3rem", md: 0 }} flexBasis="35%">
						<Flex
							width={{ base: "20%", md: "50%" }}
							mb="1.5rem"
							justify="space-between"
							align="center"
						>
							{new Array(5).fill("_").map((_, i) => (
								<Image
									width="10%"
									key={i}
									src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/star.svg"
								/>
							))}
						</Flex>
						<Text fontSize="lg" mb="2rem">
							“Quisque in lacus a urna fermentum euismod. Integer mi nibh,
							dapibus ac scelerisque eu, facilisis quis purus. Morbi blandit sit
							amet turpis nec”
						</Text>
						<Text fontSize="lg" fontWeight="bold">
							Edward Newgate
						</Text>
						<Text color="rgba(0, 0, 0, 0.85)">Founder Circle</Text>
					</Box>
					<Box width={{ base: "100%", md: "inherit" }}>
						<Box w={{ base: "100%" }}>
							<Box
								position="relative"
								maxWidth="75%"
								ml={{ base: 0, md: "auto" }}
							>
								<Image
									top="-1rem"
									right="-1rem"
									position="absolute"
									src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_circle.svg"
									transform="scale(0.8)"
								/>
								<Image
									borderRadius="10px"
									src="https://res.cloudinary.com/djksghat4/image/upload/v1606868553/chakra/testimonial_1.png"
								/>
								<Image
									bottom="-1rem"
									left="-1rem"
									position="absolute"
									src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_plus.svg"
									transform="scale(0.8)"
								/>
								<Box position="absolute" backgroundColor="brand.white" />
							</Box>
						</Box>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
};

export default sectionFive;
```

### `sectionSix.js`

```jsx
import {
	Box,
	Text,
	Image,
	Heading,
	Flex,
	Grid,
	Link as ChakraLink,
} from "@chakra-ui/react";
import Container from "../components/container";

const TrendingCards = (props) => {
	const { picture, title, summary } = props;
	return (
		<Box flex="1">
			<Box position="relative">
				<Image
					mb="1rem"
					borderTopRightRadius="10px"
					borderTopLeftRadius="10px"
					src={picture}
					maxH="14rem"
					width="fit-content"
				/>
			</Box>
			<Text width="90%" fontWeight="bold" mb="1rem" fontFamily="inter">
				{title}
			</Text>
			<Text
				width="90%"
				fontSize="sm"
				color="brand.greyText"
				mb="1.2rem"
				fontFamily="inter"
			>
				{summary}
			</Text>
			<ChakraLink
				href="#!"
				_hover={{ textDecor: "none" }}
				cursor="pointer"
				fontWeight="bold"
				color="brand.orange"
			>
				Read more
			</ChakraLink>
		</Box>
	);
};

const sectionSix = () => {
	return (
		<Box mb={["5rem", "7rem", "8rem", "10rem"]} as="section">
			<Container position="relative">
				<Box position="absolute" bottom="50%" left="-5%">
					<Image
						mr="auto"
						width="1rem"
						src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_circle.svg"
					/>
				</Box>
				<Box mb="4rem">
					<Image
						mr="auto"
						ml="20rem"
						width="1rem"
						src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_plus.svg"
					/>
				</Box>
				<Flex mb="2.4rem" justify="space-between" align="center">
					<Heading>Trending stories</Heading>
					<Flex cursor="pointer" justify="space-around" align="center">
						<Text mr="5px" fontFamily="Inter" color="brand.orange">
							View all
						</Text>
						<Image src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/arrow_right.svg" />
					</Flex>
				</Flex>
				<Grid
					gridTemplateColumns={{
						base: "1fr",
						md: "1fr 1fr",
						lg: "repeat(4, 1fr)",
					}}
					gridTemplateRows={{
						lg: "1fr",
						md: "1fr 1fr",
						base: "repeat(4, 1fr)",
					}}
					gridColumnGap="1.5rem"
					gridRowGap="1.5rem"
					justify="space-between"
				>
					<TrendingCards
						picture="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/trending_one.png"
						title="The many benefits of taking a healthy holiday"
						summary="Healthy holidays are on the rise 
to help maximize your health and happiness..."
					/>
					<TrendingCards
						picture="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/trending_two.png"
						title="The best Kyto restaurant to try Japanese food"
						summary="From tofu to teahouses, here’s our guide to Kyoto’s best restaurants
to visit..."
					/>
					<TrendingCards
						picture="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/trending_three.png"
						title="Skip Chicken Itza and head to this remote Yucatan"
						summary="It’s remote and challenging to get,
but braving the jungle and exploring
these ruins without the..."
					/>
					<TrendingCards
						picture="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/trending_four.png"
						title="Surfs up these beginner spots around the world"
						summary="If learning to surf has in on your to-
do list for a while, the good news
is: it’s never too late..."
					/>
				</Grid>

				<Box mt="5rem">
					<Image
						ml="auto"
						mr="20rem"
						width="1rem"
						src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/testimonial_circle.svg"
					/>
				</Box>
			</Container>
		</Box>
	);
};

export default sectionSix;
```

### `footer.js`

```jsx
import { Box, Text, Flex, Image, Link as ChakraLink } from "@chakra-ui/react";
import Container from "../components/container";

const Socials = ({ imagePath, href }) => {
	return (
		<ChakraLink href={href}>
			<Image
				transition=".3s ease-out"
				_hover={{ transform: "scale(1.2)" }}
				mr=".7rem"
				cursor="pointer"
				src={imagePath}
			/>
		</ChakraLink>
	);
};

const FooterLink = ({ href, children }) => {
	return (
		<ChakraLink href={href} d="block" mb=".5rem" color="brand.footerGrey">
			{children}
		</ChakraLink>
	);
};

const footer = () => {
	return (
		<Box
			pt="3rem"
			pb="2rem"
			mt={{ base: 0, md: "4rem" }}
			backgroundColor="#F9F9FB;"
			as="footer"
		>
			<Container>
				<Flex
					borderBottom="1px solid #c4c4c4"
					pb="3rem"
					mb="2.5rem"
					justify="space-between"
					flexDir={{ base: "column", md: "row" }}
					gridRowGap="2rem"
				>
					<Box flex="1.3">
						<Box width="75%">
							<ChakraLink href="#!">
								<Image
									mb="1.5rem"
									src="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/brand_logo.png"
								/>
							</ChakraLink>
							<Text mb="2.5rem" color="brand.footerGrey">
								Plan and book your perfect trip with expert advice, travel tips
								destination information from us
							</Text>
							<Text color="brand.footerGrey">
								©2020 Thousand Sunny. All rights reserved
							</Text>
						</Box>
					</Box>

					<Box flex=".7">
						<Text mb="1.5rem" fontWeight="bold">
							Destinations
						</Text>
						<FooterLink href="#!">Africa</FooterLink>
						<FooterLink href="#!">Antartica</FooterLink>
						<FooterLink href="#!">Asia</FooterLink>
						<FooterLink href="#!">Europe</FooterLink>
						<FooterLink href="#!">America</FooterLink>
					</Box>

					<Box flex=".7">
						<Text mb="1.5rem" fontWeight="bold">
							Shop
						</Text>
						<FooterLink href="#!">Destination Guides</FooterLink>
						<FooterLink href="#!">Pictorial and Gifts</FooterLink>
						<FooterLink href="#!">Special Offers</FooterLink>
						<FooterLink href="#!">Delivery Times</FooterLink>
						<FooterLink href="#!">FAQs</FooterLink>
					</Box>
					<Box flex=".7">
						<Text mb="1.5rem" fontWeight="bold">
							Interests
						</Text>
						<FooterLink href="#!">Adventure Travel</FooterLink>
						<FooterLink href="#!">Arts and Culture</FooterLink>
						<FooterLink href="#!">Wildlife and Nature</FooterLink>
						<FooterLink href="#!">Family Holidays</FooterLink>
						<FooterLink href="#!">Food and Drink</FooterLink>
					</Box>
				</Flex>
				<Flex justify="center" align="center">
					<Socials
						href="#!"
						imagePath="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/twitter.svg"
					/>
					<Socials
						href="#!"
						imagePath="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/facebook.svg"
					/>
					<Socials
						href="#!"
						imagePath="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/instagram.svg"
					/>
					<Socials
						href="#!"
						imagePath="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/linkedin.svg"
					/>
					<Socials
						href="#!"
						imagePath="https://res.cloudinary.com/djksghat4/image/upload/v1606868551/chakra/youtube.svg"
					/>
				</Flex>
			</Container>
		</Box>
	);
};

export default footer;
```

In the end, your `App.js` file should look like this:

```jsx
import { Box } from "@chakra-ui/react";
import Header from "./sections/header";
import SectionTwo from "./sections/sectionTwo";
import SectionThree from "./sections/sectionThree";
import SectionFour from "./sections/sectionFour";
import SectionFive from "./sections/sectionFive";
import SectionSix from "./sections/sectionSix";
import Footer from "./sections/footer";

function App() {
	return (
		<Box>
			<Header />
			<SectionTwo />
			<SectionThree />
			<SectionFour />
			<SectionFive />
			<SectionSix />
			<Footer />
		</Box>
	);
}

export default App;
```

## Conclusion

In this article, we've seen how to get started with Chakra UI by building a landing page with a customized theme.

Providing a design system that is highly customizable, Chakra UI goes a long way in making UI implementation with React a breeze. It comes with other features like utility hooks that might come in handy when building complex UIs.

There are other components that were not explored in this article and how to use them. You can learn more about them in the well detailed [official documentation](https://chakra-ui.com/getting-started).

You can check out the repository for this article on Github [here](https://github.com/Eronmmer/chakra-landing), you can also check out the hosted demo [here](https://chakra-landing.netlify.app/). I hope this article gets you started using Chakra UI.

## References

[Chakra UI Official Website](https://chakra-ui.com/)

[Chakra UI Repository on GitHub](https://github.com/chakra-ui/chakra-ui)
