import java.io._

object Main extends App {

  var total = BigInt("115322522587138686426174365")
  var deposited = BigInt("65144894075138676487887251")
  def remainingBonus = total - deposited

  val base = BigInt("1000" + "0" * 18)

  def sqrt(x: BigInt): BigInt = {
    var y = x;
    while (true) {
      var z = (y + (x / y)) / 2;
      var w = (z + (x / z)) / 2;
      if (w == y) {
        if (w < y) return w
        else return y
      }
      y = w
    }

    throw new Exception("")
  }

  def s(v: BigInt) = sqrt(sqrt(sqrt(sqrt(v))))
  def getBonus = {
    remainingBonus * base * s(base) / (deposited * s(deposited))
  }

  def x(v: BigInt) = (v / BigInt("1" + "0" * 18)).toLong
  var i = 0L
  var pre = BigInt(0)
  var str = "Seq, Ratial\n"
  while (total >= base) {
    i += 1
    val bonus = getBonus

    deposited -= base
    total -= (base + bonus)
    val diff = bonus - pre
    pre = bonus
    str += (s"${i}, ${x(bonus) / 1000.0 + 1}\n")

    if (i == 4598) {
      println(x(total))
    }
  }

  val pw = new PrintWriter(new File("b.csv"))
  pw.write(str)
  pw.close
}
