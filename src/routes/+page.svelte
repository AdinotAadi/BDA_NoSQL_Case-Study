<script>
    import { onMount } from "svelte";
    let title = "";
    let description = "";
    let assignments = [];
    let isEditing = false;
    let currentAssignment = {};

    // Fetch all assignments
    async function fetchAssignments() {
        const res = await fetch("/api/assignments");
        assignments = await res.json();
    }

    // Create a new assignment
    async function addAssignment() {
        if (!isEditing) {
            await fetch("/api/assignments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            });
        } else {
            await updateAssignment();
        }
        resetForm();
        await fetchAssignments();
    }

    // Update an existing assignment
    async function updateAssignment() {
        await fetch("/api/assignments", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...currentAssignment, title, description }),
        });
        isEditing = false;
        currentAssignment = {};
    }

    // Delete an assignment
    async function deleteAssignment(id) {
        await fetch("/api/assignments", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: id }),
        });
        await fetchAssignments();
    }

    // Edit an assignment (prepare for update)
    function editAssignment(assignment) {
        title = assignment.title;
        description = assignment.description;
        currentAssignment = assignment;
        isEditing = true;
    }

    // Reset the form
    function resetForm() {
        title = "";
        description = "";
        isEditing = false;
    }

    onMount(() => {
        fetchAssignments();
    });
</script>

<div class="container mx-auto p-4 text-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-100">Assignment Tracker</h1>

    <!-- Form to add or edit assignment -->
    <div class="mt-4">
        <input
            type="text"
            placeholder="Title"
            bind:value={title}
            class="border border-gray-700 bg-gray-800 rounded p-2 w-full mb-2 text-gray-100"
        />
        <input
            type="text"
            placeholder="Description"
            bind:value={description}
            class="border border-gray-700 bg-gray-800 rounded p-2 w-full mb-2 text-gray-100"
        />
        <button
            on:click={addAssignment}
            class="bg-neutral-800 text-white p-2 rounded hover:bg-neutral-600 transition"
        >
            {isEditing ? "Update" : "Add"} Assignment
        </button>
        {#if isEditing}
            <button
                on:click={resetForm}
                class="ml-2 bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition"
            >
                Cancel
            </button>
        {/if}
    </div>

    <!-- List of assignments with Edit and Delete options -->
    <ul class="mt-4">
        {#each assignments as assignment}
            <li class="border-b border-gray-700 py-2 flex justify-between items-center">
                <div>
                    <h3 class="text-xl text-gray-100">{assignment.title}</h3>
                    <p class="text-gray-300">{assignment.description}</p>
                    <p class="text-sm text-gray-500">
                        Status: {assignment.status}
                    </p>
                </div>
                <div>
                    <button
                        on:click={() => editAssignment(assignment)}
                        class="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600 transition"
                    >
                        Edit
                    </button>
                    <button
                        on:click={() => deleteAssignment(assignment._id)}
                        class="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </li>
        {/each}
    </ul>
</div>
