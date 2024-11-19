<script>
	import KnowledgeCard from '$lib/components/KnowledgeCard.svelte';
	import TreeView from '$lib/components/TreeView.svelte';
	
	const categories = [
		{
			title: 'Frameworks',
			icon: '🎯',
			items: [
				{
					title: 'React',
					description: 'A JavaScript library for building user interfaces',
					tags: ['frontend', 'javascript', 'ui', 'meta'],
					example: 'const App = () => <h1>Hello World</h1>',
					subcategories: [
						{
							title: 'Hooks',
							items: [
								{
									title: 'useState',
									description: 'State management hook for functional components',
									tags: ['hooks', 'state', 'react-core'],
									example: 'const [count, setCount] = useState(0)'
								},
								{
									title: 'useEffect',
									description: 'Side effects management in React components',
									tags: ['hooks', 'lifecycle', 'react-core'],
									example: 'useEffect(() => {\n  // Side effect code\n  return () => cleanup();\n}, [deps])'
								},
								{
									title: 'useContext',
									description: 'Context consumption in functional components',
									tags: ['hooks', 'context', 'state-management'],
									example: 'const theme = useContext(ThemeContext)'
								}
							]
						},
						{
							title: 'State Management',
							items: [
								{
									title: 'Redux',
									description: 'Predictable state container for JavaScript apps',
									tags: ['state', 'flux', 'global-state'],
									example: 'const store = createStore(reducer)'
								},
								{
									title: 'MobX',
									description: 'Simple, scalable state management',
									tags: ['state', 'reactive', 'observable'],
									example: 'const store = observable({ count: 0 })'
								}
							]
						}
					]
				},
				{
					title: 'Svelte',
					description: 'Cybernetically enhanced web apps',
					tags: ['frontend', 'javascript', 'compiler', 'reactive'],
					example: '<h1>Hello {name}</h1>',
					subcategories: [
						{
							title: 'Stores',
							items: [
								{
									title: 'Writable Stores',
									description: 'Mutable state containers in Svelte',
									tags: ['state', 'reactive', 'svelte-core'],
									example: 'const count = writable(0)'
								},
								{
									title: 'Derived Stores',
									description: 'Computed values from other stores',
									tags: ['state', 'reactive', 'computed'],
									example: 'const doubled = derived(count, $n => $n * 2)'
								}
							]
						},
						{
							title: 'Animations',
							items: [
								{
									title: 'Transitions',
									description: 'Built-in animation system',
									tags: ['animation', 'ui', 'transitions'],
									example: '<div transition:fade>Animated content</div>'
								}
							]
						}
					]
				}
			]
		},
		{
			title: 'DevOps',
			icon: '⚙️',
			items: [
				{
					title: 'Docker',
					description: 'Containerization platform',
					tags: ['containers', 'deployment', 'virtualization'],
					example: 'FROM node:18\nWORKDIR /app',
					subcategories: [
						{
							title: 'Volumes',
							items: [
								{
									title: 'Bind Mounts',
									description: 'Mount host directory to container',
									tags: ['storage', 'persistence', 'docker-core'],
									example: 'docker run -v /host:/container'
								},
								{
									title: 'Named Volumes',
									description: 'Persistent data storage',
									tags: ['storage', 'persistence', 'data'],
									example: 'docker volume create mydata'
								}
							]
						},
						{
							title: 'Networking',
							items: [
								{
									title: 'Bridge Network',
									description: 'Default docker network type',
									tags: ['networking', 'containers', 'docker-core'],
									example: 'docker network create my-net'
								},
								{
									title: 'Overlay Network',
									description: 'Multi-host networking',
									tags: ['networking', 'swarm', 'distributed'],
									example: 'docker network create -d overlay my-net'
								}
							]
						}
					]
				},
				{
					title: 'Kubernetes',
					description: 'Container orchestration platform',
					tags: ['containers', 'orchestration', 'cloud-native'],
					example: 'kubectl apply -f deployment.yaml',
					subcategories: [
						{
							title: 'Workloads',
							items: [
								{
									title: 'Deployments',
									description: 'Declarative updates for Pods and ReplicaSets',
									tags: ['k8s', 'pods', 'scaling'],
									example: 'apiVersion: apps/v1\nkind: Deployment'
								},
								{
									title: 'StatefulSets',
									description: 'Manage stateful applications',
									tags: ['k8s', 'state', 'persistence'],
									example: 'apiVersion: apps/v1\nkind: StatefulSet'
								}
							]
						},
						{
							title: 'Services',
							items: [
								{
									title: 'ClusterIP',
									description: 'Internal service type',
									tags: ['k8s', 'networking', 'service-discovery'],
									example: 'kind: Service\ntype: ClusterIP'
								},
								{
									title: 'LoadBalancer',
									description: 'External load balancer service',
									tags: ['k8s', 'networking', 'load-balancing'],
									example: 'kind: Service\ntype: LoadBalancer'
								}
							]
						}
					]
				}
			]
		}
	];
</script>

<div class="container mx-auto px-4 py-8">
	<TreeView {categories} />
</div>