<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';

	export let content = '';
	export let placeholder = 'Write something...';

	let element;
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Link.configure({
					openOnClick: false
				})
			],
			content: content,
			editorProps: {
				attributes: {
					class: 'prose prose-sm sm:prose max-w-none focus:outline-none min-h-[200px] p-4'
				}
			},
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	function toggleBold() {
		editor?.chain().focus().toggleBold().run();
	}

	function toggleItalic() {
		editor?.chain().focus().toggleItalic().run();
	}

	function toggleCode() {
		editor?.chain().focus().toggleCode().run();
	}
</script>

<div class="border rounded-lg overflow-hidden bg-white">
	<div class="border-b px-3 py-2 flex gap-2">
		<button
			class="p-1 hover:bg-gray-100 rounded {editor?.isActive('bold') ? 'bg-gray-100' : ''}"
			on:click={toggleBold}
			title="Bold"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z"
				/>
			</svg>
		</button>
		<button
			class="p-1 hover:bg-gray-100 rounded {editor?.isActive('italic') ? 'bg-gray-100' : ''}"
			on:click={toggleItalic}
			title="Italic"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 20l4-16m4 4h-8M8 16h8"
				/>
			</svg>
		</button>
		<button
			class="p-1 hover:bg-gray-100 rounded {editor?.isActive('code') ? 'bg-gray-100' : ''}"
			on:click={toggleCode}
			title="Code"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</button>
	</div>
	<div bind:this={element} />
</div>
