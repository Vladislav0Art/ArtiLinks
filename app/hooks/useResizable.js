import { useEffect, useState, useRef, useCallback } from "react";


const useResizable = ({
	width: initialWidth,
	min = 320,
	max = 600,
}) => {
	const resizableNodeRef = useRef(null);

	const [isResizing, setIsResizing] = useState(false);
	const [nodeWidth, setNodeWidth] = useState(initialWidth);

	// starting resizing node
	const startResizing = useCallback(() => setIsResizing(true), []);

	// stopping resizing node
	const stopResizing = useCallback(() => setIsResizing(false), []);

	// checking whether current with in range [min, max]
	const isWidthInRange = (width) => (min <= width && width <= max);

	// resizing node
	const resize = clientX => {
		const leftCornerX = resizableNodeRef.current.getBoundingClientRect().left;
		const newNodeWidth = clientX - leftCornerX;
		
		// if width in range [min, max]
		if(isWidthInRange(newNodeWidth)) {
			setNodeWidth(newNodeWidth);
		}
	};

	// updating width of node by mouse move
	const resizeOnMouseMove = useCallback(mouseMoveEvent => {
		// if resizing is on
		if(isResizing) {
			const clientX = mouseMoveEvent.clientX;
			resize(clientX);
		}
	}, [isResizing]);


	// updating width of node by touch move
	const resizeOnTouchMove = useCallback(touchMoveEvent => {
		// if resizing is on
		if(isResizing) {
			const clientX = touchMoveEvent.targetTouches[0].clientX;
			resize(clientX);
		}
	}, [isResizing]);


	// adding/removing event listeners for resizing node
	useEffect(() => {
		// adding resizing event listeners
		window.addEventListener("mousemove", resizeOnMouseMove);
		window.addEventListener("mouseup", stopResizing);
		
		window.addEventListener("touchmove", resizeOnTouchMove);
		window.addEventListener("touchend", stopResizing);

		// removing listeners on unmounting component
		return () => {
			window.removeEventListener("mousemove", resizeOnMouseMove);
			window.removeEventListener("mouseup", stopResizing);

			window.removeEventListener("touchmove", resizeOnTouchMove);
			window.removeEventListener("touchend", stopResizing);
		};
	}, [resizeOnMouseMove, resizeOnTouchMove, stopResizing]);

	return {
		resizableNodeRef,
		isResizing,
		nodeWidth,
		startResizing
	};
};


export default useResizable;