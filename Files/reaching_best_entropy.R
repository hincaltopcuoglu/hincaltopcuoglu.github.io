options(warn=-1)
library(plyr)
library(ggplot2)
library(gganimate)
library(dplyr)


##' **define shannon entropy**
shannon_entropy <- function(x){
  df = plyr::count(x)
  n = length(x)
  df$probs = df$freq / n
  se<- -sum(df$probs * log(df$probs,base=2))
  return(se)
}


##' **create probabilities and dataset using these probabilities**
xx<-data.frame()
yy<-seq(0,1,0.05)
data<-NULL
for (i in 1:length(yy)){
  data <- sample(c(1,0), 1000, replace=TRUE, prob = c(yy[i],1-yy[i]))
  xx[i,"probs"]<-shannon_entropy(data)
  xx[i,"indice"] <- yy[i]
  
}




##' **create plot**
myplot<-xx %>%
  ggplot( aes(x=indice, y=probs,color="steerblue")) +
  geom_line(show.legend = FALSE) +
  geom_point(show.legend = FALSE) +
  #scale_color_viridis_d() +
  ggtitle("Maksimum Entropy Riches the highest value when probabilty is equal") +
#  theme_ipsum() +
  ylab("Probabilities") +
  transition_reveal(indice)

##' **animate it**  
animate(myplot, duration = 5, fps = 20, width = 700, height = 600, renderer = gifski_renderer())
anim_save("output.gif")


