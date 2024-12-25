const backdropVariants = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1
	},
	exit: {
		opacity: 0
	},
};

const modalVariants = {
	hidden: {
		scale: 0.9,
		opacity: 0
	},
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.2
		}
	},
	exit: {
		scale: 0.9,
		opacity: 0,
		transition: {
			duration: 0.2
		}
	},
};

export {backdropVariants, modalVariants};