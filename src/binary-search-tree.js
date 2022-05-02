const { NotImplementedError } = require('../extensions/index.js')

const { Node } = require('../extensions/list-tree.js')

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null
  }

  root() {
    return this.treeRoot
  }

  add(data) {
    let addNodeData = function (node, data) {
      if(!node){
        return new Node(data)
      }
      if(node.data < data){
        node.right = addNodeData(node.right, data)
      } else if (node.data > data){
        node.left = addNodeData(node.left, data)
      }
      if(node.data === data){
        return node
      }
      return node
    }

    this.treeRoot = addNodeData(this.treeRoot, data)
  }

  has(data) {
    let searchNode = function(node, data){
      if(!node){
        return false
      }
      if(node.data < data){
        return searchNode(node.right, data)
      } else if(node.data > data){
       return searchNode(node.left, data)
      }
      
      if(node.data === data){
        return true
      }
    }

    return searchNode(this.treeRoot, data)
  }

  find(data) {
    let searchNode = function(node, data){
      if(!node){
        return null
      }
      if (node.data < data){
        return searchNode(node.right, data)
      } else if (node.data > data){
        return searchNode(node.left, data)
      }
      if (node.data === data){
        return node
      }
    }
    return searchNode(this.treeRoot, data)
  }

  remove(data) {
    function removeNode(node, data){
      if (!node) {
        return null
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else if (node.data < data) {
        node.right = removeNode(node.right, data)
        return node
      } else {
        if (!node.left && !node.right) {
          return null
        }
        if (!node.left) {
          node = node.right
          return node
        }
        if (!node.right) {
          node = node.left
          return node
        }
        let minFromRight = node.right
        while (minFromRight.left) {
          minFromRight = minFromRight.left
        }
        node.data = minFromRight.data
        node.right = removeNode(node.right, minFromRight.data)
      }return node
    }
    this.treeRoot = removeNode(this.treeRoot, data)
  }

  min() {
    if (!this.treeRoot) {
      return null
    }
    let node = this.treeRoot
    while (node.left) {
      node = node.left
    }
    return node.data
  }

  max() {
    if (!this.treeRoot) {
      return null
    }
    let node = this.treeRoot
    while (node.right) {
      node = node.right
    }
    return node.data
  }
}

module.exports = {
  BinarySearchTree
}