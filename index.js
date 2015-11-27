var falafel = require('falafel')
var uid = require('uid')

module.exports = posthaste

function posthaste(src) { 
  var triggers = []
  var optimizing = false
  falafel(src, {
    locations: true,
    onComment: cmt
  }, function () { })

  var output = falafel(src, {
    locations: true,
  }, function (node) {
    if (node.loc.start.line === triggers[0]) { optimizing = true }
    if (!optimizing) return
    var body = '', references = []
    if (node.type === 'ObjectExpression') {
      falafel('( ' + node.source() + ')', function (node) {
        if (node.type === 'Identifier') {
          if (node.parent.key === node) {
            body += '\n  this.' + node.parent.source().replace(':', ' =')  
          } else {
            references.push(node.name)
          }
          
        }
      })

      body = 'new (function Object_' + uid() + '(' + references + ') {' + body
      body += '\n})(' + references + ')'
      
      node.update(body)
      optimizing = false
    }
  })

  function cmt(block, text, start, end, locStart) {
    if (/posthaste/i.test(text)) {
      triggers.push(locStart.line + 1)  
    }
  }

  return output
}

