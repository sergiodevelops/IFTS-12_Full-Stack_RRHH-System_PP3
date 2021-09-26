const enqueueMessage = (message) => {
    return {
        type: "ENQUEUE_NOTIFICATION",
        payload: {
            message,
        },
    }
};

export default { enqueueMessage }
