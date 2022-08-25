(()=>{"use strict";var e={914:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const d=o(r(437));window.Trie=d.default},660:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.minimizeTrie=t.buildTrie=void 0;const o=r(556),d=r(312),i=r(146);t.buildTrie=(e,t)=>{new o.GraphNode(e,!0);for(const r of t){const t=(0,i.findPrefix)(r,e);if(!t)throw Error("No prefix has been found, meaning root node is not initialized");(0,d.createWord)(t.neededLetters,t.node,e)}},t.minimizeTrie=e=>{let t=[...e.nodes];const r=[];for(;t[0];){if(r.includes(t[0].id)){t.shift();continue}const o=t[0],d=e.nodes.filter((t=>t.id!=o.id&&e.compareNodes(o,t)));d.length>0&&(d.unshift(o),e.mergeNodes(d)),r.push(o.id),t=[...e.nodes]}}},312:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createWord=void 0;const o=r(556);t.createWord=(e,t,r)=>{let d=t;const i=new o.GraphNode(r);for(let t of e){const e=new o.GraphNode(r);d.addChildEdge(t,e.id),d=e}return d.addChildEdge("EOW",i.id),i}},146:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.findPrefix=void 0,t.findPrefix=(e,t)=>{for(let r=e.length;r>=0;r--){const o=e.slice(0,r);for(const d of t.nodes)if(d.evaluateParentWord()===o)return{node:d.isEndNode?d.parentEdge[0].node:d,neededLetters:e.slice(r)}}}},437:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(660),d=r(556);t.default={generateTrieGraph:(...e)=>{const t=new d.Graph;return(0,o.buildTrie)(t,e),t},minimizeTrieGraph:e=>((0,o.minimizeTrie)(e),e),generateDawg:(...e)=>{const t=new d.Graph;return(0,o.buildTrie)(t,e),(0,o.minimizeTrie)(t),t}}},515:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Graph=void 0;const o=r(379);t.Graph=class{nodes=[];vizGraph="";getNode(e){const t=this.nodes.find((t=>t.id===e));if(!t)throw new Error(`Node #${e} not found`);return t}addNode(e){this.nodes.push(e)}getShortRootSummary(){return this.nodes[0].getSummery()}calculateEdgeWord(e,t,r){t+=e.char,e.node.isEndNode&&r.push(t);for(const o of e.node.edges)this.calculateEdgeWord(o,t,r);return r}compareNodes(e,t){const r=this.calculateEdgeWord({char:"",node:e},"",[]),o=this.calculateEdgeWord({char:"",node:t},"",[]);if(r.length!==o.length)return!1;for(const e of o){const t=r.findIndex((t=>t===e));if(-1===t)return!1;r.splice(t,1)}return!(r.length>0)}deleteNode(e){const t=this.getNode(e);for(const e of t.edges)t.removeChildEdge(e.char,e.node.id);for(const e of t.parentEdge)t.removeParentEdge(e.char,e.node.id);const r=this.nodes.findIndex((t=>t.id===e));this.nodes.splice(r,1)}mergeNodes(e){const t=e.shift();for(const r of e){for(const e of r.parentEdge)e.node.addChildEdge(e.char,t.id);this.deleteNode(r.id)}}convertToVizGraph(){return this.vizGraph=this.vizGraph?this.vizGraph:(0,o.convertGraphToVizGraph)(this),this.vizGraph}}},230:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GraphNode=void 0;const o=r(379);t.GraphNode=class{NodeManager;isRoot;id=(0,o.generateID)();edges=[];parentEdge=[];isEndNode=!1;constructor(e,t=!1){this.NodeManager=e,this.isRoot=t,this.NodeManager.addNode(this)}getSummery(){return{id:this.id,edges:this.edges.map((e=>({char:e.char,node:e.node.getSummery()})))}}addParentEdge(e){"EOW"===e.char&&(this.isEndNode=!0),this.parentEdge.push(e)}addChildEdge(e,t){const r=this.NodeManager.getNode(t);this.edges.push({char:e,node:r}),r.addParentEdge({char:e,node:this})}removeParentEdge(e,t,r={bidirectional:!0}){const o=this.parentEdge.findIndex((r=>r.char===e&&r.node.id===t));if(-1===o)throw new Error(`A parent edge with char:${e} and id: ${t} does not exist`);const d=this.parentEdge.splice(o,1);(r?.bidirectional??1)&&d[0].node.removeChildEdge(e,this.id,{bidirectional:!1})}removeChildEdge(e,t,r={bidirectional:!0}){const o=this.edges.findIndex((r=>r.char===e&&r.node.id===t));if(-1===o)throw new Error(`A child edge with char:${e} and id: ${t} does not exist`);const d=this.edges.splice(o,1);(r?.bidirectional??1)&&d[0].node.removeParentEdge(e,this.id,{bidirectional:!1})}getParentEdge(){return this.parentEdge}evaluateParentWord(){let e=this,t="";for(;!e.isRoot;)e.isEndNode||(t=e.parentEdge[0].char+t),e=e.parentEdge[0].node;return t}}},629:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var d=Object.getOwnPropertyDescriptor(t,r);d&&!("get"in d?!t.__esModule:d.writable||d.configurable)||(d={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,d)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),d=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),d(r(515),t),d(r(230),t)},379:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.convertGraphToVizGraph=t.generateID=void 0;let r=0;t.generateID=()=>++r,t.convertGraphToVizGraph=e=>{const t=e.nodes[0];let r=[...t.edges.map((e=>({from:t,char:e.char,to:e.node})))],o=[];for(o.push("digraph {");r[0];){const e=r[0];o.push(`${e.from.id} -> ${e.to.id} [label="${e.char}" fontsize="${e.to.isEndNode?15:30}pt"];`),r.shift(),e.to.isEndNode||r.push(...e.to.edges.map((t=>({from:e.to,char:t.char,to:t.node}))))}return o.push("}"),o=Array.from(new Set(o)),o.join("\n")}},556:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var d=Object.getOwnPropertyDescriptor(t,r);d&&!("get"in d?!t.__esModule:d.writable||d.configurable)||(d={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,d)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),d=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),d(r(629),t)}},t={};!function r(o){var d=t[o];if(void 0!==d)return d.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,r),i.exports}(914)})();